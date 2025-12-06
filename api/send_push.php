<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['title']) || !isset($input['body'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Title and Body required']);
    exit;
}

$title = $input['title'];
$body = $input['body'];
$image = $input['image'] ?? '';
$url = $input['url'] ?? '/';

// 1. Get Access Token from Service Account
function getAccessToken()
{
    $credFile = '../includes/fcm_credentials.php';
    if (!file_exists($credFile)) {
        throw new Exception("Credentials file not found");
    }

    $base64 = require $credFile;
    $jsonKey = base64_decode($base64);
    $key = json_decode($jsonKey, true);

    if (!$key)
        throw new Exception("Invalid credentials");

    $now = time();
    $header = ['alg' => 'RS256', 'typ' => 'JWT'];
    $payload = [
        'iss' => $key['client_email'],
        'sub' => $key['client_email'],
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
        'scope' => 'https://www.googleapis.com/auth/firebase.messaging'
    ];

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    $signatureInput = $base64UrlHeader . "." . $base64UrlPayload;

    $privateKey = $key['private_key'];
    openssl_sign($signatureInput, $signature, $privateKey, 'SHA256');
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    $jwt = $signatureInput . "." . $base64UrlSignature;

    // Exchange JWT for Access Token
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $json = json_decode($response, true);
    return $json['access_token'] ?? null;
}

try {
    $accessToken = getAccessToken();
    if (!$accessToken) {
        throw new Exception("Failed to get Access Token");
    }

    // 2. Load Subscribers
    $subscribersFile = '../subscribers.json';
    if (!file_exists($subscribersFile)) {
        echo json_encode(['success' => false, 'message' => 'No subscribers found']);
        exit;
    }
    $tokens = json_decode(file_get_contents($subscribersFile), true);
    if (empty($tokens)) {
        echo json_encode(['success' => false, 'message' => 'No subscribers list is empty']);
        exit;
    }

    // 3. Send Messages (Looping for now, ideally batch or queue)
    $projectId = 'astro-quiz-push-2026';
    $endpoint = "https://fcm.googleapis.com/v1/projects/$projectId/messages:send";

    $successCount = 0;
    $failureCount = 0;
    $removedCount = 0;
    $validTokens = [];

    foreach ($tokens as $token) {
        $message = [
            'message' => [
                'token' => $token,
                'notification' => [
                    'title' => $title,
                    'body' => $body
                ],
                'webpush' => [
                    'headers' => [
                        'Urgency' => 'high'
                    ],
                    'notification' => [
                        'body' => $body,
                        'requireInteraction' => true
                    ],
                    'fcm_options' => [
                        'link' => $url
                    ]
                ]
            ]
        ];

        if ($image) {
            $message['message']['notification']['image'] = $image;
            $message['message']['webpush']['notification']['image'] = $image;
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer $accessToken",
            "Content-Type: application/json"
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            $successCount++;
            $validTokens[] = $token;
        } else {
            $failureCount++;
            // If 404/410, token is invalid. Don't add to validTokens.
            // Simplified cleanup logic: we rewrite file with only valid tokens + unknown errors (to be safe)
            // Ideally check response error code.
            $resJson = json_decode($result, true);
            $errorCode = $resJson['error']['details'][0]['errorCode'] ?? '';
            if ($errorCode !== 'UNREGISTERED') {
                $validTokens[] = $token; // Keep if error is temporary
            } else {
                $removedCount++;
            }
        }
    }

    // Update subscribers file with cleaned list
    file_put_contents($subscribersFile, json_encode($validTokens));

    echo json_encode([
        'success' => true,
        'message' => "Sent to $successCount users. Failed: $failureCount. Removed: $removedCount",
        'stats' => ['success' => $successCount, 'failure' => $failureCount]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>