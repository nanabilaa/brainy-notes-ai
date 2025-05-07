<?php
session_start();
require_once 'core/database.php';
require_once 'core/supabase-config.php';

// Set a timeout for operations
set_time_limit(30);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $db = Database::getInstance();
    
        if (isset($_POST['type']) && $_POST['type'] === 'logout') {
            session_destroy();
            header("Location: /");
            exit;
        }
        
        // Check if required fields exist
        if (!isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['type'])) {
            header("Location: error.php?error=Missing required fields");
            exit;
        }

        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];
        $type = $_POST['type'];
        
        // Use Supabase Auth API for login/signup
        $authEndpoint = $type === 'login' 
            ? SUPABASE_URL . '/auth/v1/token?grant_type=password'
            : SUPABASE_URL . '/auth/v1/signup';
        
        $data = [
            'email' => $email,
            'password' => $password
        ];
        
        if ($type === 'signup' && isset($_POST['full_name'])) {
            $data['data'] = [
                'full_name' => $_POST['full_name']
            ];
        }
        
        // Debug the data being sent
        error_log("Auth request to: " . $authEndpoint);
        
        // Make request to Supabase Auth
        $ch = curl_init($authEndpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'apikey: ' . SUPABASE_KEY,
            'X-Client-Info: Brainy Notes Auth'
        ]);
        
        // Set shorter timeout (5 seconds) to prevent long waits
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        
        curl_setopt($ch, CURLOPT_FAILONERROR, false);
        
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        $errno = curl_errno($ch);
        
        // Debug response
        error_log("Auth response status: " . $status);
        if ($error) {
            error_log("CURL Error #$errno: $error");
        }
        
        curl_close($ch);
        
        if ($errno) {
            // Handle specific curl errors more gracefully
            switch ($errno) {
                case CURLE_OPERATION_TIMEDOUT:
                    throw new Exception("Connection to Supabase timed out. Please try again later.");
                case CURLE_COULDNT_CONNECT:
                    throw new Exception("Could not connect to Supabase API. Please check your internet connection.");
                default:
                    throw new Exception("Connection error: $error");
            }
        }
        
        $result = json_decode($response, true);
        
        if ($status >= 200 && $status < 300) {
            // Success - set session data
            if ($type === 'login') {
                $_SESSION['user_id'] = $result['user']['id'];
                $_SESSION['email'] = $result['user']['email'];
                $_SESSION['access_token'] = $result['access_token'];
            } else {
                $_SESSION['user_id'] = $result['id'];
                $_SESSION['email'] = $result['email']; 
                
                error_log("User created in Supabase Auth with ID: " . $result['id']);
            }
            
            header("Location: /");
            exit;
        } else {
            // Detailed error handling
            $errorMsg = isset($result['error_description']) ? $result['error_description'] : 
                      (isset($result['msg']) ? $result['msg'] : 
                      (isset($result['error']) ? $result['error'] : 'Unknown error'));
            
            // Log the error for debugging
            error_log("Auth failed: Status=$status, Error=$errorMsg, Response=" . $response);
            
            header("Location: error.php?error=" . urlencode("Authentication failed (Status: $status)") . 
                  "&msg=" . urlencode($errorMsg));
            exit;
        }
    } catch (Exception $e) {
        error_log("Exception in auth.php: " . $e->getMessage());
        header("Location: error.php?error=Auth Error&msg=" . urlencode($e->getMessage()));
        exit;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['check_email'])) {
    // Set proper headers
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type');
    
    try {
        $email = isset($_GET['check_email']) ? trim($_GET['check_email']) : '';
        if (empty($email)) {
            throw new Exception("Email parameter is empty");
        }
        
        // Check if email exists in Supabase
        $db = Database::getInstance();
        $user = $db->findUserByEmail($email);
        
        echo json_encode([
            'exists' => $user !== null,
            'success' => true,
            'email' => $email
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'error' => $e->getMessage(),
            'success' => false
        ]);
    }
    exit;
} else {
    echo "Invalid request method";
    exit;
}
?>