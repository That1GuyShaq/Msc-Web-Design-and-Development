<?php
    require_once(__DIR__ . '\App\Controllers\SessionController.php');
    require_once(__DIR__ . '\App\Models\Student.php');
    // session_start();
    // print_r($_SESSION);
    $appUrl   = Session::start('.env', 'student');
    $data     = json_decode(json_encode($_SESSION), false);
    $students = Student::all();
?>

<!DOCTYPE html5>
<html lang="en">
	<head>
		<title>sTUDENT-M9ASII</title>

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
                            <a class="nav-link active" aria-current="page" href="<?php echo $appUrl; ?>/student.php">mY BioData</a>
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
            <div class="row g-3">
                <div class="col-12">

                    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#studentModal" id="createStudent" data-bs-title="Create Student" data-bs-created-by="<?php echo $data->id; ?>">
                        <span class="fw-bold">+</span> Create Student
                    </button>

                    <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby=studentModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="<?php echo $appUrl; ?>/App/Process/studentCreate.php" method="post" class="row g-3 needs-validation" id="studentForm" novalidate>
                                        <input type="hidden" name="createdBy" value="<?php echo $data->id; ?>">
                                        
                                        <div class="col-6">
                                            <input type="text" class="form-control" id="firstName" name="firstName" placeholder="First Name" required>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last Name" required>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth" placeholder="Date of Birth" max="<?php echo date('Y-m-d'); ?>" required>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <select class="form-select" id="gender" name="gender" required>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-4"> 
                                            <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" required>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <input type="text" class="form-control" id="state" name="state" placeholder="State" required>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <textarea class="form-control" id="address" name="address" placeholder="Address" rows="3" required></textarea>
                                            <div class="invalid-feedback">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success" form="studentForm" id="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card"> 
                        <div class="card-body">
                            <table class="table table-hover w-100">
                                <thead>
                                    <tr class="text-center">
                                        <th scope="col">Student ID</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Date of Birth</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                        foreach ($students as $student) {
                                            echo "<tr>";
                                            echo "<td class='text-center'> $student->id </td>";
                                            echo "<td> $student->firstName </td>";
                                            echo "<td> $student->lastName </td>";
                                            echo "<td> $student->dateOfBirth </td>";
                                            echo "<td> $student->gender </td>";
                                            echo "<td> $student->phoneNumber </td>";
                                            echo "<td> $student->email </td>";
                                            echo "<td> $student->state </td>";
                                            echo "<td> $student->address </td>";
                                            echo "<td>
                                                <button type='button' class='btn btn-sm btn-info text-light' data-bs-toggle='modal' data-bs-target='#studentModal' id='viewStudent' data-bs-title='View Student' data-bs-student='" . json_encode($student) . "'>
                                                    View
                                                </button>
                                                
                                                <button type='button' class='btn btn-sm btn-primary' data-bs-toggle='modal' data-bs-target='#studentModal' id='updateStudent' data-bs-title='Update Student' data-bs-appUrl='$appUrl' data-bs-student='" . json_encode($student) . "'>
                                                    Update
                                                </button>

                                                <button type='button' class='btn btn-sm btn-danger' data-bs-toggle='modal' data-bs-target='#studentModal' id='deleteStudent' data-bs-title='Delete Student' data-bs-appUrl='$appUrl' data-bs-student='" . json_encode($student) . "'>
                                                    Delete
                                                </button>
                                            </td>";
                                            echo "</tr>";
                                        }
                                    ?>
                                </tbody>
                            </table>
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