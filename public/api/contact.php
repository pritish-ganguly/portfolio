<?php
// Strict CORS for production
header("Content-Type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

// 1. Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit;
}

// 2. Validate Content-Type
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if ($contentType !== "application/json") {
    http_response_code(415);
    echo json_encode(["success" => false, "message" => "Unsupported Media Type."]);
    exit;
}

// 3. Payload size limit (Prevent DoS - limit to 10KB)
$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int)$_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > 10240) {
    http_response_code(413);
    echo json_encode(["success" => false, "message" => "Payload too large."]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE || !$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON payload."]);
    exit;
}

// 4. Honeypot check
if (!empty($data['website_url'])) {
    echo json_encode(["success" => true]); // Silent fail for bots
    exit;
}

// 5. Time-based validation (requires frontend to send start_time)
if (isset($data['start_time'])) {
    $submissionTime = time() - intval($data['start_time']);
    if ($submissionTime < 2 || $submissionTime > 3600) {
        // Form submitted in less than 2 seconds or took > 1 hour
        echo json_encode(["success" => true]); // Silent fail for bots
        exit;
    }
}

// 6. Rate Limiting (Session-based)
session_start();
$last_submit = isset($_SESSION['last_submit']) ? $_SESSION['last_submit'] : 0;
if (time() - $last_submit < 30) {
    http_response_code(429);
    echo json_encode(["success" => false, "message" => "Please wait before sending another message."]);
    exit;
}
$_SESSION['last_submit'] = time();

// 7. Validate required fields
$required = ['name', 'email', 'service', 'message'];
foreach ($required as $field) {
    if (empty(trim($data[$field] ?? ''))) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Please fill all required fields."]);
        exit;
    }
}

// 8. Field length limits
if (strlen(trim($data['name'])) > 100) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name is too long."]);
    exit;
}

// 9. Validate Email
$emailRaw = trim($data['email']);
if (!filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit;
}

// 10. Sanitize inputs completely (Prevent XSS and header injection)
// filter_var removes newlines from email, stopping header injection in Reply-To
$email = filter_var($emailRaw, FILTER_SANITIZE_EMAIL);
$name = htmlspecialchars(strip_tags(trim($data['name'])), ENT_QUOTES, 'UTF-8');
$company = isset($data['company']) ? htmlspecialchars(strip_tags(trim($data['company'])), ENT_QUOTES, 'UTF-8') : 'N/A';
$service = htmlspecialchars(strip_tags(trim($data['service'])), ENT_QUOTES, 'UTF-8');
$budget = isset($data['budget']) ? htmlspecialchars(strip_tags(trim($data['budget'])), ENT_QUOTES, 'UTF-8') : 'Not specified';
$message = htmlspecialchars(strip_tags(trim($data['message'])), ENT_QUOTES, 'UTF-8');

// 11. Limit message length
if (strlen($message) > 3000) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Message is too long (max 3000 chars)."]);
    exit;
}
if (strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Message is too short."]);
    exit;
}

// 12. Email construction
$to = "pritishganguly07@gmail.com";
$subject = "New Portfolio Enquiry - " . $service;

$emailContent = "You have received a new enquiry from your portfolio.\n\n";
$emailContent .= "Name: $name\n";
$emailContent .= "Email: $email\n";
$emailContent .= "Company: $company\n";
$emailContent .= "Service: $service\n";
$emailContent .= "Budget: $budget\n\n";
$emailContent .= "Message:\n$message\n";

// 13. Safe headers
// Use HTTP_HOST securely, fallback to a safe default if missing
$host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['HTTP_HOST']) : 'portfolio';
$fromEmail = "noreply@" . $host;

// Construct headers array to avoid string concatenation issues in modern PHP
$headers = [
    'From' => $fromEmail,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion()
];

// Send Email
if (mail($to, $subject, $emailContent, $headers)) {
    echo json_encode(["success" => true]);
} else {
    // Return generic error, no stack trace or internal details
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send message. Server configuration issue."]);
}
?>
