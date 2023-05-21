<?php
$error_message = "Oops! Something went wrong, Ckick on Email for alternative"; // Custom error message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  
  // Send email
  $to = "jo.erl444@gmail.com";
  $subject = "New Message from Contact Form";
  $headers = "From: " . $name . " <" . $email . ">";
  
  if (mail($to, $subject, $message, $headers)) {
    echo "success";
  } else {
    echo $error_message; // Display the custom error message
  }
}
?>
