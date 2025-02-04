<?php
require_once(__DIR__ . '\..\Controllers\Controller.php');
require_once(__DIR__ . '\..\Controllers\StudentController.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    $request = new stdClass();

    $request->firstName    = $_POST['firstName'] ?? '';
    $request->lastName     = $_POST['lastName'] ?? '';
    $request->dateOfBirth  = $_POST['dateOfBirth'] ?? '';
    $request->gender       = $_POST['gender'] ?? '';
    $request->phoneNumber  = $_POST['phoneNumber'] ?? '';
    $request->email        = $_POST['email'] ?? '';
    $request->state        = $_POST['state'] ?? '';
    $request->address      = $_POST['address'] ?? '';
    $request->createdBy    = $_POST['createdBy'] ?? '';

    // print_r($request);
    // die;
    $created = StudentController::create($request);

    if ($created) {
        $controller = new Controller();
        $controller->redirectToHome($_SESSION['role']);
    }
}