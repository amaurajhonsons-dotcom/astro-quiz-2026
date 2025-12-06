<?php
require_once '../includes/auth_helper.php';

$accessToken = getAccessToken();
if (!$accessToken) {
    die("Auth failed");
}

$projectId = 'astro-quiz-push-2026';
$uuid = uniqid('test_user_');
$firestoreUrl = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/subscribers?documentId=$uuid";

$data = [
    'fields' => [
        'token' => ['stringValue' => 'test_token_from_php'],
        'platform' => ['stringValue' => 'PHP_Server'],
        'timestamp' => ['timestampValue' => date('Y-m-d\TH:i:s\Z')]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $firestoreUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo "Attempted Write. Response: " . $response;
?>