<?php
session_start();
require_once 'core/database.php';
require_once 'core/supabase-config.php';

set_time_limit(30);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $db = Database::getInstance();

        if ($_POST['type'] === 'logout') {
            session_destroy();
            header("Location: /");
            exit;
        }

        if (!isset($_POST['email'], $_POST['password'], $_POST['type'])) {
            header("Location: error.php?error=Missing required fields");
            exit;
        }

        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];
        $type = $_POST['type'];

        $authEndpoint = ($type === 'login')
            ? SUPABASE_URL . '/auth/v1/token?grant_type=password'
            : SUPABASE_URL . '/auth/v1/signup';

        $data = ['email' => $email, 'password' => $password];

        if ($type === 'signup' && isset($_POST['full_name'])) {
            $data['data'] = ['full_name' => htmlspecialchars($_POST['full_name'])];
        }

        $ch = curl_init($authEndpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'apikey: ' . SUPABASE_KEY,
                'X-Client-Info: Brainy Notes Auth'
            ],
            CURLOPT_TIMEOUT => 5,
            CURLOPT_CONNECTTIMEOUT => 3
        ]);

        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        $errno = curl_errno($ch);
        curl_close($ch);

        if ($errno) {
            throw new Exception("Connection error: $error");
        }

        $result = json_decode($response, true);

        if ($status >= 200 && $status < 300) {
            if ($type === 'login') {
                $_SESSION['user_id'] = $result['user']['id'];
                $_SESSION['email'] = $result['user']['email'];
                $_SESSION['access_token'] = $result['access_token'];
            } else {
                $_SESSION['user_id'] = $result['id'];
                $_SESSION['email'] = $result['email'];
            }

           
        session_write_close();
header("Location: /index.php?loggedin=1");
exit;
        } else {
            $errorMsg = $result['error_description'] ?? $result['msg'] ?? $result['error'] ?? 'Unknown error';
            header("Location: error.php?error=" . urlencode("Authentication failed (Status: $status)") . "&msg=" . urlencode($errorMsg));
            exit;
        }
    } catch (Exception $e) {
        header("Location: error.php?error=Auth Error&msg=" . urlencode($e->getMessage()));
        exit;
    }
}
?>
