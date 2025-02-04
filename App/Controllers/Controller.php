<?php


Class Controller
{
    public function __construct()
    {
        
    }

    public static function env(string $envFile = '.env', string $key)
    {   
        if (file_exists($envFile)) {
            $env  = parse_ini_file($envFile, true);
            $_ENV = array_merge($_ENV, $env);
        }
        return $_ENV[$key];
    }

    protected function view($view, $data = [])
    {   
        $appUrl = Controller::env('../../.env', 'APP_URL');
        session_start();
        $_SESSION['data'] = $data;
        header("Location: $appUrl/$view.php");
        exit;
    }

    protected function startSession(int $id, string $firstName, string $lastName, string $role): void  {
        session_start();

        $_SESSION['id']        = $id;
        $_SESSION['name']      = "$firstName $lastName";
        $_SESSION['firstName'] = $firstName;
        $_SESSION['lastName']  = $lastName;
        $_SESSION['role']      = $role;
    }

    public function redirectToHome($role):void {
        $appUrl = Controller::env('../../.env', 'APP_URL');
        $role   = strtolower($role);

        // print("Location: $appUrl/$role.php");
        // die;
        if ($role == 'admin' || $role == 'student') {
            header("Location: $appUrl/$role.php");
        } else {
            $response = new stdClass();
            $response->errors['form'] = 'Something went wrong. Please contact your system administrator.';
            $this->view('index', [$response]);
        }
    }

    protected function redirectToLogin() {
        $appUrl = Controller::env('../../.env', 'APP_URL');
        header("Location: $appUrl/index.php");
    }

    public function connectDB(): mysqli {
        $mysqli = new mysqli(
            Controller::env('../../.env', 'DB_HOST'),
            Controller::env('../../.env', 'DB_USERNAME'),
            Controller::env('../../.env', 'DB_PASSWORD'),
            Controller::env('../../.env', 'DB_DATABASE'),
            Controller::env('../../.env', 'DB_PORT')
        );

        if ($mysqli->connect_errno) {
            throw new Exception("Failed to connect to MySQL: ({$mysqli->connect_errno}) {$mysqli->connect_error}");
        } else {
            return $mysqli;
        }
    }

}