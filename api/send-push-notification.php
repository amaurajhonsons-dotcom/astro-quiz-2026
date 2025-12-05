<?php

$oneSignalAppId = getenv('ONESIGNAL_APP_ID') ?: 'YOUR_ONESIGNAL_APP_ID';
$oneSignalApiKey = getenv('ONESIGNAL_API_KEY') ?: 'YOUR_ONESIGNAL_REST_API_KEY';

function sendPushNotification($heading, $message, $url, $segments = ['All']) {
    global $oneSignalAppId, $oneSignalApiKey;
    
    $fields = [
        'app_id' => $oneSignalAppId,
        'included_segments' => $segments,
        'headings' => ['en' => $heading],
        'contents' => ['en' => $message],
        'url' => $url,
        'big_picture' => '',
        'chrome_web_icon' => '',
        'chrome_web_badge' => ''
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://onesignal.com/api/v1/notifications');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . $oneSignalApiKey
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

$pushMessages = [
    [
        'heading' => '🚨 2026 का सीक्रेट!',
        'message' => 'तुम्हारा लव मैच कौन? अभी पता करो!',
        'url' => 'https://yoursite.com/quizzes/quiz.html?id=love-match'
    ],
    [
        'heading' => '💰 लाखों मिलेंगे?',
        'message' => 'फ्री मनी लक क्विज़ - सिर्फ 2 मिनट!',
        'url' => 'https://yoursite.com/quizzes/quiz.html?id=money-luck'
    ],
    [
        'heading' => '⚠️ लिमिटेड टाइम!',
        'message' => '24 घंटे में खत्म - अभी देखो तुम्हारा फ्यूचर!',
        'url' => 'https://yoursite.com'
    ]
];

if (php_sapi_name() === 'cli') {
    $randomPush = $pushMessages[array_rand($pushMessages)];
    $result = sendPushNotification(
        $randomPush['heading'],
        $randomPush['message'],
        $randomPush['url']
    );
    
    echo "Push sent: " . json_encode($result) . "\n";
} else {
    echo "Run this script from CLI: php send-push-notification.php\n";
}
?>