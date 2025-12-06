<?php
function getAccessToken()
{
    $credFile = __DIR__ . '/fcm_credentials.php';
    if (!file_exists($credFile)) {
        return null;
    }

    $base64 = require $credFile;
    $jsonKey = base64_decode($base64);
    $key = json_decode($jsonKey, true);

    if (!$key)
        return null;

    $now = time();
    $header = ['alg' => 'RS256', 'typ' => 'JWT'];
    $payload = [
        'iss' => $key['client_email'],
        'sub' => $key['client_email'],
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
        'scope' => 'https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/cloud-platform'
    ];

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    $signatureInput = $base64UrlHeader . "." . $base64UrlPayload;

    $privateKey = $key['private_key'];
    openssl_sign($signatureInput, $signature, $privateKey, 'SHA256');
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    $jwt = $signatureInput . "." . $base64UrlSignature;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $json = json_decode($response, true);
    return $json['access_token'] ?? null;
}
?>