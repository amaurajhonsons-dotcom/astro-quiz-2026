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

require_once '../includes/auth_helper.php';

// getAccessToken is available from helper

try {
    $accessToken = getAccessToken();
    if (!$accessToken) {
        throw new Exception("Failed to get Access Token");
    }

    // 2. Load Subscribers from Firestore (REST API)
    // We use the same Access Token (it has scope for database too ideally, or we ensure scope)
    // Note: The scope 'https://www.googleapis.com/auth/firebase.messaging' might not be enough for Firestore.
    // We need 'https://www.googleapis.com/auth/datastore' as well.
    // But first let's update scopes in getAccessToken.

    // Using the token directly with Firestore REST API
    $projectId = 'astro-quiz-push-2026';
    // 2. Fetch Subscribers (or use target)
    $targetToken = $input['target_token'] ?? null;
    $tokens = [];

    if ($targetToken) {
        $tokens[] = $targetToken;
        echo "Debugging Single Token Mode.\n";
    } else {
        // Fetch from Firestore
        $firestoreUrl = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/subscribers?pageSize=1000";
        // ... existing list code ...
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $firestoreUrl);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $accessToken"]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);
        if (isset($data['documents'])) {
            foreach ($data['documents'] as $doc) {
                $path = $doc['name']; // projects/.../documents/subscribers/{token}
                $parts = explode('/', $path);
                $token = end($parts);
                if ($token)
                    $tokens[] = $token;
            }
        }
    }
    if (empty($tokens)) {
        echo json_encode(['success' => false, 'message' => 'No active subscribers in Firestore']);
        exit;
    }

    // 3. Send Messages
    $endpoint = "https://fcm.googleapis.com/v1/projects/$projectId/messages:send";

    $successCount = 0;
    $failureCount = 0;
    $removedCount = 0; // We won't remove from Firestore via PHP yet to match simple logic

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
        } else {
            $failureCount++;
        }
    }

    echo json_encode([
        'success' => true,
        'message' => "Sent to $successCount users. Failed: $failureCount",
        'stats' => ['success' => $successCount, 'failure' => $failureCount]
    ]);
    exit; // End execution here, skipping old file write logic

    /* OLD LOGIC REMOVED */

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>