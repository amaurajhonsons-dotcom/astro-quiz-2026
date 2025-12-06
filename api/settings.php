<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$file = '../prompt_config.json';

// Default Config
$defaultConfig = [
    'title' => '🔔 Get Daily Astro Updates!',
    'subtitle' => 'Enable notifications to never miss your daily horoscope.',
    'btnText' => 'Allow Notifications',
    'icon' => 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Merge input with defaults to ensure structure
    $newConfig = array_merge($defaultConfig, $input ?? []);

    if (file_put_contents($file, json_encode($newConfig))) {
        echo json_encode(['success' => true, 'message' => 'Settings saved', 'config' => $newConfig]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save settings']);
    }
    exit;
}

// GET request
if (file_exists($file)) {
    $config = json_decode(file_get_contents($file), true);
    echo json_encode(['success' => true, 'config' => $config]);
} else {
    echo json_encode(['success' => true, 'config' => $defaultConfig]);
}
?>