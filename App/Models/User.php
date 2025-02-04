<?php
require_once('..\App\Controllers\Controller.php');

class User
{
    private $id;
    private $firstName;
    private $lastName;
    private $email;
    private $password; // Consider hashing passwords for security

    public function __construct($id, $firstName, $lastName, $email)
    {
        $this->id    = $id;
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
        $this->email     = $email;
    }

    public function getid()
    {
        return $this->id;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function getEmail()
    {
        return $this->email;
    }
    
    public static function create($id, $firstName, $lastName, $email, $password):User | null
    {
        try {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $controller = new Controller();
            $mysqli = $controller->connectDB();
            $stmt   = $mysqli->prepare('INSERT INTO users (id, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }
                
            $stmt->bind_param('i', $id);
            $stmt->bind_param('issss', $id, $firstName, $lastName, $email, $hashedPassword);
            $stmt->execute();

            if ($stmt->errno) {
                throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
            }

            $stmt->close();
            $mysqli->close();

            return new User($id, $firstName, $lastName, $email);
        } catch (Exception $e) {
            // Handle exception
            echo 'Error: ' . $e->getMessage();
            return null;
        }
    }
    
    public static function find($id):User | null
    {   
        $controller = new Controller();
        $mysqli = $controller->connectDB();
        $stmt   = $mysqli->prepare('SELECT id, firstname, lastname, email FROM users WHERE id = ?');
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
        }
            
        $stmt->bind_param('i', $id);
        $stmt->bind_result($id, $firstName, $lastName, $email);
        $stmt->execute();

        if ($stmt->errno) {
            throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
        }

        if (!$stmt->fetch()) {
            $stmt->close();
            $mysqli->close();
            return null;    
        }

        $stmt->close();
        $mysqli->close();

        return new User($id, $firstName, $lastName, $email);
    }

    public static function getAllStudents() {
        $controller = new Controller();
        $mysqli = $controller->connectDB();
        $stmt   = $mysqli->prepare('SELECT id, firstname, lastname, email FROM users WHERE role = "Student"');
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
        }
            
        $stmt->bind_result($id, $firstName, $lastName, $email);
        $stmt->execute();

        if ($stmt->errno) {
            throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
        }

        $students = [];
        while ($stmt->fetch()) {
            $students[] = new User($id, $firstName, $lastName, $email);
        }

        $stmt->close();
        $mysqli->close();

        return $students;
    }
}

