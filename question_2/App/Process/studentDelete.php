<?php
require_once(__DIR__ . '\..\Controllers\StudentController.php');


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $deleted = StudentController::delete($_GET['id']);

    if ($deleted) {
        session_start();
        $controller = new Controller();
        $controller->redirectToHome($_SESSION['role']);
    }
}