<?php
/**
 * Cron Job Script: Automated Daily Push Notifications
 * 
 * Setup in cPanel:
 * Cron Jobs > Add New Cron Job
 * Command: php /home/username/public_html/api/cron-push-scheduler.php
 * Schedule: Daily at 9 AM, 3 PM, 7 PM
 */

require_once __DIR__ . '/send-push-notification.php';

$pushSchedule = [
    'morning' => [
        'time' => '09:00',
        'heading' => '☀️ गुड मॉर्निंग!',
        'message' => 'आज का तुम्हारा लकी कलर क्या है? फ्री क्विज़ लो!',
        'url' => 'https://yoursite.com/quizzes/quiz.html?id=lucky-month'
    ],
    'afternoon' => [
        'time' => '15:00',
        'heading' => '💰 पैसे की बात!',
        'message' => '2026 में कितने लाख मिलेंगे? जानो अभी!',
        'url' => 'https://yoursite.com/quizzes/quiz.html?id=money-luck'
    ],
    'evening' => [
        'time' => '19:00',
        'heading' => '💘 लव अलर्ट!',
        'message' => 'तुम्हारा परफेक्ट मैच कौन? क्विज़ में पता करो!',
        'url' => 'https://yoursite.com/quizzes/quiz.html?id=love-match'
    ]
];

$currentHour = date('H:00');
$pushToSend = null;

foreach ($pushSchedule as $key => $push) {
    if ($push['time'] === $currentHour) {
        $pushToSend = $push;
        break;
    }
}

if ($pushToSend) {
    $result = sendPushNotification(
        $pushToSend['heading'],
        $pushToSend['message'],
        $pushToSend['url']
    );
    
    $logFile = __DIR__ . '/../data/push-log.txt';
    $logEntry = date('Y-m-d H:i:s') . " - Sent: {$pushToSend['heading']} - Result: " . json_encode($result) . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
    
    echo "Push notification sent successfully!\n";
    echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
} else {
    echo "No push scheduled for this hour.\n";
}

function sendDailyRashifalPush() {
    $rashis = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'];
    $randomRashi = $rashis[array_rand($rashis)];
    
    $predictions = [
        'आज तुम्हारा दिन शानदार रहेगा! 🌟',
        'किसी स्पेशल से मिलने का चांस! 💕',
        'पैसे के मामले में लकी दिन! 💰',
        'करियर में गुड न्यूज़ आ सकती है! 🚀',
        'हेल्थ का ध्यान रखो आज! ❤️'
    ];
    $randomPrediction = $predictions[array_rand($predictions)];
    
    return sendPushNotification(
        "🔮 {$randomRashi} राशिफल",
        $randomPrediction . " पूरा पढ़ने के लिए क्लिक करो!",
        "https://yoursite.com"
    );
}
?>