<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');


require_once '../includes/auth_helper.php';

$accessToken = getAccessToken();
if (!$accessToken) {
    echo json_encode(['success' => false, 'count' => 0, 'error' => 'Auth failed']);
    exit;
}

$projectId = 'astro-quiz-push-2026';
$firestoreUrl = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/subscribers?pageSize=1000&mask.fieldPaths=name";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $firestoreUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $accessToken"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$fsResponse = curl_exec($ch);
curl_close($ch);

$fsData = json_decode($fsResponse, true);
$count = 0;

if (isset($fsData['error'])) {
    echo json_encode(['success' => false, 'error' => $fsData['error']]);
    exit;
}

if (isset($fsData['documents'])) {
    $count = count($fsData['documents']);
}

// Check for nextPageToken to verify if we hit 1000 limit (simple handling: if 1000, probably more)
// For now, exact count up to 1000 is enough for user validation.

echo json_encode(['success' => true, 'count' => $count]);
?>