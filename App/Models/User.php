<?php
require_once(__DIR__ . '\..\Controllers\Controller.php');

class User
{
    public $id;
    public $firstName;
    public $lastName;
    public $email;
    private $password; // Consider hashing passwords for security

    public function __construct($id, $firstName, $lastName, $email)
    {
        $this->id        = $id;
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
        $this->email     = $email;
    }

    
    public static function findEmail($email): bool
    {
        $controller = new Controller();
        $mysqli = $controller->connectDB();
        $stmt   = $mysqli->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
        }
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
        $mysqli->close();
        return $count > 0;
    }
    
    public static function create($firstName, $lastName, $email, $password, $role):User | null
    {
        print_r($password);
        // die;
        try {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $controller = new Controller();
            $mysqli = $controller->connectDB();
            $stmt   = $mysqli->prepare('INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }
        
            $stmt->bind_param('sssss',  $firstName, $lastName, $email, $hashedPassword, $role);
            $stmt->execute();

            if ($stmt->errno) {
                throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
            }

            $stmt->close();

            $stmt = $mysqli->prepare('SELECT id FROM users WHERE email = ?');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }

            $stmt->bind_param('s', $email);
            $stmt->bind_result($id);
            $stmt->execute();

            if ($stmt->errno) {
                throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
            }

            if (!$stmt->fetch()) {
                $stmt->close();
                $mysqli->close();
                return null;
            }

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

    public static function update($id, $firstName, $lastName, $email): bool
    {
        try {
            $controller = new Controller();
            $mysqli = $controller->connectDB();
            $stmt = $mysqli->prepare('UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }

            $stmt->bind_param('sssi', $firstName, $lastName, $email, $id);
            $stmt->execute();

            if ($stmt->errno) {
                throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
            }

            $stmt->close();
            $mysqli->close();

            return true;
        } catch (Exception $e) {
            // Handle exception
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }
    
    public static function delete($id): bool
    {
        $controller = new Controller();
        $mysqli = $controller->connectDB();
        $stmt = $mysqli->prepare('DELETE FROM users WHERE id = ?');
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
        }

        $stmt->bind_param('i', $id);
        $stmt->execute();

        if ($stmt->errno) {
            throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
        }

        $stmt->close();
        $mysqli->close();

        return true;
    }
}

