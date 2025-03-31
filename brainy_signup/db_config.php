<?php
// Database configuration
$servername = "localhost";
$username = "root";  // database username
$password = "";      // database password
$dbname = "brainy_notes";  // database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set
$conn->set_charset("utf8mb4");
?>

