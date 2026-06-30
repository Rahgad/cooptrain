<?php
header('Content-Type: application/json');

require_once DIR . '/config/database.php';

$action = $_POST['action'] ?? '';

if ($action === 'register') {

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$name  !$email  !$password) {
        echo json_encode([
            'success' => false,
            'message' => 'يرجى تعبئة جميع الحقول'
        ]);
        exit;
    }

    // تشفير كلمة المرور
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'تم إنشاء الحساب بنجاح'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'فشل إنشاء الحساب: ربما البريد مستخدم'
        ]);
    }

    $stmt->close();
    exit;
}


if ($action === 'login') {

    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo json_encode([
            'success' => false,
            'message' => 'يرجى إدخال البريد وكلمة المرور'
        ]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {

            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ]);

        } else {
            echo json_encode([
                'success' => false,
                'message' => 'كلمة المرور غير صحيحة'
            ]);
        }

    } else {
        echo json_encode([
            'success' => false,
            'message' => 'المستخدم غير موجود'
        ]);
    }

    $stmt->close();
    exit;
}

echo json_encode([
    'success' => false,
    'message' => 'طلب غير صحيح'
]);
?>