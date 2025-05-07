<?php
require_once 'supabase-config.php';

class Database {
    private static $instance = null;
    private $supabaseUrl;
    private $supabaseKey;

    private function __construct() {
        $this->supabaseUrl = SUPABASE_URL;
        $this->supabaseKey = SUPABASE_KEY;
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function makeRequest($endpoint, $method = 'GET', $data = null) {
        $url = $this->supabaseUrl . $endpoint;
        
        $options = [
            'http' => [
                'header'  => "Authorization: Bearer " . $this->supabaseKey . "\r\n" .
                             "apikey: " . $this->supabaseKey . "\r\n" .
                             "Content-Type: application/json\r\n" .
                             "Prefer: return=representation\r\n",
                'method'  => $method
            ]
        ];
        
        if ($data !== null) {
            $options['http']['content'] = json_encode($data);
        }
        
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        
        if ($result === FALSE) {
            throw new Exception("API request failed");
        }
        
        return json_decode($result, true);
    }

    public function query($table, $options = []) {
        $endpoint = '/rest/v1/' . $table;
        
        if (!empty($options['select'])) {
            $endpoint .= '?select=' . urlencode($options['select']);
        }
        
        return $this->makeRequest($endpoint);
    }
    
    public function findUserByEmail($email) {
        $endpoint = '/rest/v1/users?email=eq.' . urlencode($email);
        try {
            $result = $this->makeRequest($endpoint);
            return !empty($result) ? $result[0] : null;
        } catch (Exception $e) {
            // Log error or handle gracefully
            return null;
        }
    }
    
    public function insert($table, $data) {
        $endpoint = '/rest/v1/' . $table;
        return $this->makeRequest($endpoint, 'POST', $data);
    }
    
    public function createTable($tableName, $schema) {
        // Unfortunately, direct SQL execution isn't available via REST API
        // This is a placeholder - tables need to be created through Supabase dashboard
        throw new Exception("Table creation through REST API is not supported. Please use Supabase Dashboard to create tables.");
    }
    
    public function getConnection() {
        // This method is needed for compatibility with the existing code
        // but doesn't actually return a connection since we're using REST API
        return null;
    }
}
?>