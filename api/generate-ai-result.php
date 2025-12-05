<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$quizId = $_POST['quizId'] ?? 'love-match';
$answers = json_decode($_POST['answers'] ?? '[]', true);
$zodiac = $answers[0] ?? 'aries';

$openaiApiKey = getenv('OPENAI_API_KEY') ?: 'YOUR_OPENAI_API_KEY_HERE';

$prompts = [
    'love-match' => "तुम एक एक्सपर्ट वैदिक एस्ट्रोलॉजर हो। {$zodiac} राशि के लिए 2026 का लव प्रेडिक्शन दो। परफेक्ट मैच, टाइमिंग, और पर्सनल टिप्स (हिंदी में, 100 words)।",
    
    'money-luck' => "तुम एक एक्सपर्ट फाइनेंशियल एस्ट्रोलॉजर हो। {$zodiac} राशि के लिए 2026 का मनी प्रेडिक्शन दो। इनकम, सोर्सेस, लकी टिप्स (हिंदी में, 100 words)।",
    
    'career-boost' => "तुम एक करियर एस्ट्रोलॉजर हो। {$zodiac} राशि के लिए 2026 का करियर प्रेडिक्शन दो। ग्रोथ, ऑपर्च्युनिटीज़, टिप्स (हिंदी में, 100 words)।"
];

$prompt = $prompts[$quizId] ?? $prompts['love-match'];

function callOpenAI($prompt, $apiKey) {
    $data = [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            [
                'role' => 'system',
                'content' => 'तुम एक प्रोफेशनल एस्ट्रोलॉजर हो जो हिंदी में accurate प्रेडिक्शन्स देता है।'
            ],
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ],
        'max_tokens' => 200,
        'temperature' => 0.8
    ];
    
    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $result = json_decode($response, true);
        return $result['choices'][0]['message']['content'] ?? null;
    }
    
    return null;
}

$aiResult = callOpenAI($prompt, $openaiApiKey);

if ($aiResult) {
    echo json_encode([
        'success' => true,
        'aiPrediction' => $aiResult,
        'timestamp' => time()
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'फॉलबैक प्रेडिक्शन यूज़ हो रहा है',
        'aiPrediction' => 'तुम्हारे stars 2026 में बहुत स्ट्रॉन्ग हैं! ' . ucfirst($zodiac) . ' राशि के लिए ये साल लाइफ-चेंजिंग रहेगा। पेशेंस रखो और पॉजिटिव रहो। तुम्हारी मेहनत जरूर रंग लाएगी!'
    ]);
}
?>