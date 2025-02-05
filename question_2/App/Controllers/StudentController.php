<?php
require_once('Controller.php');
require_once('..\Models\Student.php');

class StudentController extends Controller 
{
    public $response;

    public function __construct()
    {
        parent::__construct();

        $this->response = new stdClass();
        $this->response->errors = [];
        $this->response->valid  = false;
    }

    public static function create($request): bool 
    {
        $controller = new StudentController();

        $student = Student::create(
            $request->createdBy, 
            $request->firstName, 
            $request->lastName, 
            $request->dateOfBirth, 
            $request->gender, 
            $request->phoneNumber, 
            $request->email, 
            $request->state, 
            $request->address
        );

        if (!$student) {
            return false;
        }else {
            return true;
        }
    }

    public static function update($request): bool 
    {
        $controller = new StudentController();   

        $updated = Student::update(
            $request->userId,
            $request->firstName, 
            $request->lastName, 
            $request->dateOfBirth, 
            $request->gender, 
            $request->phoneNumber, 
            $request->email, 
            $request->state, 
            $request->address
        );

        return $updated;
    }
    
    public static function delete($id)
    {
        return User::delete($id);
    }
    
}