<?php
// Supreme Air Austin Contact Form Handler with reCAPTCHA
// Place this file in your website's root directory on BlueHost

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : 'General Inquiry';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$recaptcha_token = isset($_POST['recaptcha_token']) ? trim($_POST['recaptcha_token']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and phone are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Verify reCAPTCHA
if (empty($recaptcha_token)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please complete the reCAPTCHA verification']);
    exit;
}

// Verify reCAPTCHA with Google
// Updated secret key for directory-based structure
$recaptcha_secret = '6LcoxgwsAAAAAIDqp9KxTr3FACio8EzU5mvbyjyI';
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_data = [
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_token,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$recaptcha_options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($recaptcha_data)
    ]
];

$recaptcha_context = stream_context_create($recaptcha_options);
$recaptcha_result = file_get_contents($recaptcha_url, false, $recaptcha_context);
$recaptcha_response = json_decode($recaptcha_result, true);

if (!$recaptcha_response['success']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed. Please try again.']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Email configuration
$to = 'supremeairusa@gmail.com, websiteleadsmail@gmail.com';
$subject = "New Lead from Supreme Air Austin Website - $name";
$reply_to = $email;

// Email content
$email_body = "
<html>
<head>
    <title>New Lead from Supreme Air Austin</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #009ed7; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #009ed7; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='header'>
        <h2>🏠 New Lead from Supreme Air Austin Website</h2>
    </div>
    
    <div class='content'>
        <div class='field'>
            <span class='label'>Name:</span> $name
        </div>
        
        <div class='field'>
            <span class='label'>Phone:</span> $phone
        </div>
        
        <div class='field'>
            <span class='label'>Email:</span> $email
        </div>
        
        <div class='field'>
            <span class='label'>Service Requested:</span> $service
        </div>
        
        <div class='field'>
            <span class='label'>Message:</span><br>
            " . nl2br($message) . "
        </div>
        
        <div class='field'>
            <span class='label'>Submitted:</span> " . date('F j, Y \a\t g:i A') . "
        </div>
    </div>
    
    <div class='footer'>
        <p><strong>Supreme Air Austin</strong><br>
        Austin's #1 Air Duct Cleaning Experts<br>
        Phone: (512) 277-9782<br>
        Website: supremeairaustin.com</p>
    </div>
</body>
</html>
";

// Email headers
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Supreme Air Austin Website <noreply@supremeairaustin.com>',
    'Reply-To: ' . $reply_to,
    'X-Mailer: PHP/' . phpversion()
);

// Convert headers array to string
$headers_string = implode("\r\n", $headers);

// Send email
$mail_sent = mail($to, $subject, $email_body, $headers_string);

if ($mail_sent) {
    // Log the submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - New lead: $name ($email) - $service\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully. We will contact you soon!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please call us directly at (512) 277-9782.'
    ]);
}
?>
