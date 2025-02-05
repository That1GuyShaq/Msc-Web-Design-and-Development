<?php
    require_once(__DIR__ . '\App\Controllers\SessionController.php');
    require_once(__DIR__ . '\App\Models\Student.php');
    
    $appUrl   = Session::start('.env', 'student');
    $data     = json_decode(json_encode($_SESSION), false);
    $student = Student::find($data->id);
?>

<!DOCTYPE html5>
<html lang="en">
	<head>
		<title>Student-M9ASII</title>

		<meta http-equiv="content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link rel="stylesheet" href="<?php echo $appUrl; ?>/public/css/style.css" media="all"/>
        <link rel="stylesheet" href="<?php echo $appUrl; ?>/public/css/bootstrap.min.css" media="all"/>
	</head>
	<body>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="<?php echo $appUrl; ?>/student.php">M9ASII</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span   span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="<?php echo $appUrl; ?>/student.php">My BioData</a>
                        </li>
                    </ul>
                </div>
                <span class="navbar-text">
                    <a href="<?php echo $appUrl; ?>/App/Process/logout.php" class="btn btn-sm btn-outline-danger text-danger" role="button">
                    Logout ->]
                </a>
                </span>
            </div>
        </nav>

        <div class="container-fluid d-flex justify-content-center align-items-center p-3">
            <div class="row justify-content-md-center g-3">
                <div class="col-12">
                    <button type="button" class="btn btn-primary float-end" id="updateStudent">Update My BioData</button>
                </div>

                <div class="col-7">
                    <div class="card"> 
                        <div class="card-header">
                            <h3 class="card-title">My BioData</h3>
                        </div>
                        <div class="card-body">
                            <form action="<?php echo $appUrl; ?>/App/Process/studentUpdate.php" method="post" class="row g-3 needs-validation" id="studentForm" novalidate>
                                <input type="hidden" name="userId" value="<?php echo $student->userId; ?>">
                                <div class="col-6">
                                    <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" value="<?php echo $student->firstName; ?>" disabled required>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" value="<?php echo $student->lastName; ?>" disabled required>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth" value="<?php echo $student->dateOfBirth; ?>" placeholder="Date of Birth" max="<?php echo date('Y-m-d'); ?>" disabled required>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <select class="form-select" id="gender" name="gender" value="<?php echo $student->gender; ?>" disabled required>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-4"> 
                                    <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" value="<?php echo $student->phoneNumber; ?>" placeholder="Phone Number" disabled required>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <input type="email" class="form-control" id="email" name="email" value="<?php echo $student->email; ?>" placeholder="Email" disabled required>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <input type="text" class="form-control" id="state" name="state" value="<?php echo $student->state; ?>" placeholder="State" disabled required>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control w-100" id="address" name="address" placeholder="Address" rows="3" disabled required>
                                    <?php echo $student->address; ?>
                                    </textarea>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="card-footer d-flex justify-content-end gap-3">
                            <button type="submit" class="btn btn-success" form="studentForm" disabled id="studentFormSubmit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</body>
    <script src="<?php echo $appUrl; ?>/public/js/jquery.js"></script>
    <script src="<?php echo $appUrl; ?>/public/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo $appUrl; ?>/public/js/student.js"></script>
</html>