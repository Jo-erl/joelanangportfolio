<?php
// contact-form-handler.php

// Sanitize and validate input data
$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($_POST['message']));

// Check for required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo "Please complete all fields.";
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Invalid email address.";
    exit;
}

// Send the email
$to = 'jo.erl444@gmail.com'; 
$subject = 'New Contact Form Submission';
$body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: $name <$email>";

// Attempt to send the email
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "Thank you! Your message has been sent.";
} else {
    http_response_code(500);
    echo "Something went wrong. Please try again later.";
}
?>
