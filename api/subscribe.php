<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);
$token = $data['token'] ?? '';
$file = '../subscribers.json';

if (!$token) {
    http_response_code(400);
    echo json_encode(['error' => 'Token required']);
    exit;
}

// Load existing
$subscribers = [];
if (file_exists($file)) {
    $content = file_get_contents($file);
    $subscribers = json_decode($content, true) ?? [];
}

// Add if new
if (!in_array($token, $subscribers)) {
    $subscribers[] = $token;
    if (file_put_contents($file, json_encode($subscribers))) {
        echo json_encode(['success' => true, 'message' => 'Token saved']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save file']);
    }
} else {
    echo json_encode(['success' => true, 'message' => 'Token already exists']);
}
?>