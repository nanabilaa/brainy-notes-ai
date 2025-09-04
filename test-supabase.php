<?php
require_once 'core/supabase-config.php';

echo "<h1>Testing Supabase Connection</h1>";

$ch = curl_init(SUPABASE_URL . '/rest/v1/?apikey=' . SUPABASE_KEY);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . SUPABASE_KEY
]);

$startTime = microtime(true);
$response = curl_exec($ch);
$endTime = microtime(true);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

echo "<p>Connection time: " . round(($endTime - $startTime) * 1000) . "ms</p>";
echo "<p>Status code: $status</p>";

if ($error) {
    echo "<p>Error: $error</p>";
} else {
    echo "<p>Connection successful!</p>";
}

curl_close($ch);
?>
