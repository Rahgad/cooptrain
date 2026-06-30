<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "sts"; // اسم قاعدة البيانات اللي أنشأناها في phpMyAdmin

// إنشاء الاتصال
$conn = new mysqli($host, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
} 
?>