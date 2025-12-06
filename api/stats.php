<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file = '../subscribers.json';
$count = 0;

if (file_exists($file)) {
    $subscribers = json_decode(file_get_contents($file), true);
    if (is_array($subscribers)) {
        $count = count($subscribers);
    }
}

echo json_encode(['success' => true, 'count' => $count]);
?>