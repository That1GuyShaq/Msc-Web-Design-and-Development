<?php
require_once(__DIR__ . '/../Controllers/Controller.php');
require_once 'User.php';

class Student extends Controller
{
    public $id;
    public $firstName;
    public $lastName;
    public $dateOfBirth;
    public $gender;
    public $phoneNumber;
    public $email;
    public $state;
    public $address;
    public $userId;

    public function __construct($id, $firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address, $userId)
    {
        $this->id          = $id | null;
        $this->firstName   = $firstName;
        $this->lastName    = $lastName;
        $this->dateOfBirth = $dateOfBirth;
        $this->gender      = $gender;
        $this->phoneNumber = $phoneNumber;
        $this->email       = $email;
        $this->state       = $state;
        $this->address     = $address;
        $this->userId      = $userId;
    }

    
    public static function find($id):Student | null {
        $controller = new Controller();
        $mysqli = $controller->connectDB();
        $stmt   = $mysqli->prepare('SELECT student.id, users.firstname, users.lastname, student.date_of_birth, student.gender, student.phone_number, users.email, student.state, student.address, student.user_id FROM users LEFT JOIN student ON users.id = student.user_id WHERE users.id = ?');
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
        }
            
        $stmt->bind_param('i', $id);
        $stmt->bind_result($id, $firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address, $userId);
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

        return new Student(
            $id, 
            $firstName, 
            $lastName, 
            $dateOfBirth, 
            $gender, 
            $phoneNumber, 
            $email, 
            $state, 
            $address,
            $userId
        );
    }

    public static function all() {
        $controller = new Controller();
        $mysqli = $controller->connectDB();
        $stmt   = $mysqli->prepare('SELECT student.id, users.firstname, users.lastname, student.date_of_birth, student.gender, student.phone_number, users.email, student.state, student.address, student.user_id FROM users LEFT JOIN student ON users.id = student.user_id WHERE users.role = "Student";');
        if (!$stmt) {
            throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
        }
            
        $stmt->bind_result($id, $firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address, $userId);
        $stmt->execute();

        if ($stmt->errno) {
            throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
        }

        $students = [];
        while ($stmt->fetch()) {

            $students[] = new Student(
                $id, 
                $firstName, 
                $lastName, 
                $dateOfBirth, 
                $gender, 
                $phoneNumber, 
                $email, 
                $state, 
                $address,
                $userId
            );
        }

        $stmt->close();
        $mysqli->close();

        return $students;
    }
    
    private static function validate($firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address):array
    {
        $errors = [];

        if (empty($firstName) || !is_string($firstName)) {
            $errors['firstName'] = 'First name must be a valid string';
        }

        if (empty($lastName) || !is_string($lastName)) {
            $errors['lastName'] = 'Last name must be a valid string';
        }

        if (empty($dateOfBirth) || !strtotime($dateOfBirth)) {
            $errors['dateOfBirth'] = 'Date of birth must be a valid date';
        }

        if (empty($gender) || !in_array($gender, ['Male', 'Female'])) {
            $errors['gender'] = 'Gender must be either Male or Female';
        }

        if (empty($phoneNumber) || !is_string($phoneNumber) || !preg_match('/^[0-9]{11}$/', $phoneNumber)) {
            $errors['phoneNumber'] = 'Phone number must be a valid 11 digit number';
        }

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email must be a valid email address';
        }

        if (!empty($email) && User::findEmail($email)) {
            $errors['email'] = 'Email already exists in the system';
        }

        if (empty($state) || !is_string($state)) {
            $errors['state'] = 'State must be a valid string';
        }

        if (empty($address) || !is_string($address)) {
            $errors['address'] = 'Address must be a valid string';
        }

        return $errors;
    }

    public static function create($createdBy,$firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address):Student | null
    {
        try {
            $password = str_replace('-', '', $dateOfBirth);
            $user     = User::create( $firstName, $lastName, $email, $password, 'student');

            if (!$user) {
                throw new Exception("Failed to create user");
            }

            $controller = new Controller();
            $mysqli = $controller->connectDB();
            $stmt   = $mysqli->prepare('INSERT INTO student(date_of_birth, gender, phone_number, state, address, user_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }
                
            $stmt->bind_param('sssssii', $dateOfBirth, $gender, $phoneNumber, $state, $address, $user->id, $createdBy);
            $stmt->execute();

            if ($stmt->errno) {
                throw new Exception("Failed to execute SQL statement: (" . $stmt->errno . ") " . $stmt->error);
            }

            $stmt->close();

            $stmt = $mysqli->prepare('SELECT id FROM student WHERE user_id = ?');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }

            $stmt->bind_param('i', $user->id);
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

            $stmt->close();
            $mysqli->close();

            return new Student($id,$firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address, $user->id);
        } catch (Exception $e) {
            // Handle exception
            echo 'Error: ' . $e->getMessage();
            return null;
        }
    }

    public static function update($userId, $firstName, $lastName, $dateOfBirth, $gender, $phoneNumber, $email, $state, $address):bool
    {
        try {;
            $user = User::find($userId);

            if (!$user) {
                throw new Exception("User not found");
            }

            User::update($user->id, $firstName, $lastName, $email);

            $controller = new Controller();
            $mysqli     = $controller->connectDB();
            $stmt       = $mysqli->prepare('UPDATE student SET date_of_birth = ?, gender = ?, phone_number = ?, state = ?, address = ? WHERE user_id = ?');

            if (!$stmt) {
                throw new Exception("Failed to prepare SQL statement: (" . $mysqli->errno . ") " . $mysqli->error);
            }
                
            $stmt->bind_param('sssssi', $dateOfBirth, $gender, $phoneNumber, $state, $address, $userId);
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
}