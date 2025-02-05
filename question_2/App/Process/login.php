<?php
require_once('..\Controllers\AuthenticateUserController.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $request = new stdClass();

    $request->email    = $_POST['email'] ?? '';
    $request->password = $_POST['password'] ?? '';

    $auth = new AuthenicateUserController();
    $auth->authenticate($request);
    
}
