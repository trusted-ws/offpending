<?php
header('Content-Type: application/json');

// Database configuration
$servername = "localhost";  // Database server
$username = "";             // Database username
$password = "";             // Database password
$dbname = "offpending";     // Database name

$inputData = json_decode(file_get_contents('php://input'), true);

if ($inputData) {
    $input1 = filter_var($inputData['input1'], FILTER_SANITIZE_STRING);
    $input2 = filter_var($inputData['input2'], FILTER_SANITIZE_STRING);
    $input3 = filter_var($inputData['input3'], FILTER_SANITIZE_STRING);
    $input4 = filter_var($inputData['input4'], FILTER_SANITIZE_STRING);

    $storedAt = filter_var($inputData['stored_at'], FILTER_SANITIZE_STRING);
    $datetime = date('Y-m-d H:i:s');

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
    }

    $stmt = $conn->prepare("INSERT INTO requests (input_a, input_b, input_c, input_d, stored_at, datetime) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $input1, $input2, $input3, $input4, $storedAt, $datetime);

    if ($stmt->execute()) {
        $response = ['success' => true, 'message' => 'Data stored successfully'];
    } else {
        $response = ['success' => false, 'message' => 'Error storing data: ' . $stmt->error];
    }

    $stmt->close();
    $conn->close();
} else {
    $response = ['success' => false, 'message' => 'No data received'];
}

echo json_encode($response);  // not sure if we need that.
?>
<!-- I was naked when coding this -->