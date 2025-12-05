<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$playerId = $_POST['playerId'] ?? null;
$zodiac = $_POST['zodiac'] ?? 'unknown';
$quizzesTaken = json_decode($_POST['quizzesTaken'] ?? '[]', true);

if (!$playerId) {
    echo json_encode(['success' => false, 'message' => 'Player ID required']);
    exit;
}

$dataFile = __DIR__ . '/../data/subscribers.json';

if (!file_exists(dirname($dataFile))) {
    mkdir(dirname($dataFile), 0755, true);
}

$subscribers = [];
if (file_exists($dataFile)) {
    $subscribers = json_decode(file_get_contents($dataFile), true) ?? [];
}

$subscribers[$playerId] = [
    'playerId' => $playerId,
    'zodiac' => $zodiac,
    'quizzesTaken' => $quizzesTaken,
    'subscribedAt' => time(),
    'lastActive' => time()
];

file_put_contents($dataFile, json_encode($subscribers, JSON_PRETTY_PRINT));

echo json_encode([
    'success' => true,
    'message' => 'सब्सक्राइबर सेव हो गया!',
    'totalSubscribers' => count($subscribers)
]);
?>