<?php
require_once(__DIR__ . '\..\Controllers\Controller.php');
require_once(__DIR__ . '\..\Controllers\StudentController.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $request = new stdClass();

    $request->userId       = $_POST['userId'] ?? '';
    $request->firstName    = $_POST['firstName'] ?? '';
    $request->lastName     = $_POST['lastName'] ?? '';
    $request->dateOfBirth  = $_POST['dateOfBirth'] ?? '';
    $request->gender       = $_POST['gender'] ?? '';
    $request->phoneNumber  = $_POST['phoneNumber'] ?? '';
    $request->email        = $_POST['email'] ?? '';
    $request->state        = $_POST['state'] ?? '';
    $request->address      = $_POST['address'] ?? '';

    // print_r($_SESSION);
    // die;
    $updated = StudentController::update($request);

    if ($updated) {
        $controller = new Controller();
        $controller->redirectToHome($_SESSION['role']);
    }
}