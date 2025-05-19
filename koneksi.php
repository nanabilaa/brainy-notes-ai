<?php
require_once 'core/database.php';

try {
    $db = Database::getInstance();
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?>
