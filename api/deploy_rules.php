<?php
require_once '../includes/auth_helper.php';

header('Content-Type: text/plain');

// 1. Get Access Token
$accessToken = getAccessToken();
if (!$accessToken) {
    die("Error: Could not retrieve Access Token.\n");
}
echo "Got Access Token.\n";

$projectId = 'astro-quiz-push-2026';
$rulesContent = file_get_contents('../firestore.rules');
if (!$rulesContent) {
    die("Error: Could not read firestore.rules file.\n");
}

// 2. Create a Ruleset
$createRulesetUrl = "https://firebaserules.googleapis.com/v1/projects/$projectId/rulesets";
$requestData = [
    'source' => [
        'files' => [
            [
                'name' => 'firestore.rules',
                'content' => $rulesContent
            ]
        ]
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $createRulesetUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$responseData = json_decode($response, true);
if ($httpCode !== 200 || !isset($responseData['name'])) {
    echo "Error creating ruleset ($httpCode): " . $response . "\n";
    exit;
}

$rulesetName = $responseData['name']; // Format: projects/{project}/rulesets/{uuid}
echo "Created Ruleset: $rulesetName\n";

// 3. Update the Release (cloud.firestore)
$releaseName = "projects/$projectId/releases/cloud.firestore";
$updateReleaseUrl = "https://firebaserules.googleapis.com/v1/$releaseName";

$releaseData = [
    'name' => $releaseName,
    'rulesetName' => $rulesetName
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $updateReleaseUrl);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH"); // PATCH to update
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($releaseData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    echo "SUCCESS: Rules deployed successfully!\n";
    echo "Response: " . $response . "\n";
} else {
    echo "Error updating release ($httpCode): " . $response . "\n";
    // Attempt Create if PATCH failed (maybe release doesn't exist yet?)
    // Actually typically the release 'cloud.firestore' exists if DB exists. 
    // If 404, we might need to CREATE it via POST to /releases.
    // But let's assume update first.
}
?>