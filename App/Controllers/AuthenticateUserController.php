<?php

require_once '../Controllers/Controller.php';
require_once '../Controllers/SessionController.php';
class AuthenicateUserController extends Controller{
    private $email;
    private $password;
    public $response;

    public function __construct()
    {
        $this->response = new stdClass();
        $this->response->errors = [];
        $this->response->valid  = false;


    }

    private function validate(stdClass $request)
    {
        if (empty($request->email)) {
            $this->response->errors['email'] = 'You must enter an email.';
        } else if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            $this->response->errors['email'] = 'You must enter a valid email.';
        }
        $this->response->email = $request->email ?? null;

        if (empty($request->password)) {
            $this->response->errors['password'] = 'You must enter a password.';
        }

        if (empty($this->response->errors)) {
            $this->response->valid = true;
        }
    }

    public function authenticate(stdClass $request)
    {
        $this->validate($request);

        if (!$this->response->valid) {
            return $this->view('index', [$this->response]);
        }

        $this->response->valid  = false;
        try {
            $mysqli = $this->connectDB();
            $stmt   = $mysqli->prepare('SELECT id, firstname, lastname, role, password FROM users WHERE email = ?');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }
            
            $stmt->bind_param('s', $request->email);
            $stmt->bind_result($id, $firstname, $lastname, $role, $hashedPassword);
            $stmt->execute();

            if ($stmt->errno) {
                throw new Exception("Failed to execute SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }
            
            if ($stmt->fetch()) {
                if (password_verify($request->password, $hashedPassword)) {
                    
                    $this->startSession($id, $firstname, $lastname, $role);
                    $this->response->valid = true;
                } else {
                    $this->response->errors['form'] = 'Invalid email or password entered';
                }
            } else {
                $this->response->errors['form'] = 'Invalid email or password entered';
            }
            $stmt->close();

            if (!$this->response->valid) {
                return $this->view('index', [$this->response]);
            }else {
                return $this->redirectToHome($role);
            }
            
        } catch (Exception $e) {
            $this->response->errors['form'] = $e->getMessage();
            $this->response->valid = false;
            return $this->view('index', [$this->response]);
        }
    }

    public function logout()
    {
        Session::destroy();
    }
}
