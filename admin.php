<?php
    require_once(__DIR__ . '\App\Controllers\SessionController.php');
    require_once(__DIR__ . '\App\Models\Student.php');

    $appUrl   = Session::start('.env', 'admin');
    $data     = json_decode(json_encode($_SESSION), false);
    $students = Student::all();
?>

<!DOCTYPE html5>
<html lang="en">
	<head>
		<title>Admin-M9ASII</title>

		<meta http-equiv="content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link rel="stylesheet" href="<?php echo $appUrl; ?>/public/css/style.css" media="all"/>
        <link rel="stylesheet" href="<?php echo $appUrl; ?>/public/css/bootstrap.min.css" media="all"/>
	</head>
	<body>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="<?php echo $appUrl; ?>/admin.php">M9ASII</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span   span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="<?php echo $appUrl; ?>/admin.php">Students BioData</a>
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

                    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#createStudentModal" id="createStudent" data-bs-app-url="<?php echo $appUrl; ?>" data-bs-created-by="<?php echo $data->id; ?>">
                        <span class="fw-bold">+</span> Create Student
                    </button>

                    <?php require_once(__DIR__ . '\public\modals\create.html'); ?>
                    <?php require_once(__DIR__ . '\public\modals\view.html'); ?>
                    <?php require_once(__DIR__ . '\public\modals\update.html'); ?>
                    <?php require_once(__DIR__ . '\public\modals\delete.html'); ?>
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
                                            echo "<td class='text-center'>
                                                <button type='button' class='btn btn-sm btn-info text-light' data-bs-toggle='modal' data-bs-target='#viewStudentModal' id='viewStudent' data-bs-student='" . json_encode($student) . "'>
                                                    View
                                                </button>
                                                
                                                <button type='button' class='btn btn-sm btn-primary' data-bs-toggle='modal' data-bs-target='#updateStudentModal' id='updateStudent' data-bs-app-url='$appUrl' data-bs-student='" . json_encode($student) . "'>
                                                    Update
                                                </button>

                                                <button type='button' class='btn btn-sm btn-danger' data-bs-toggle='modal' data-bs-target='#deleteStudentModal' id='deleteStudent' data-bs-app-url='$appUrl' data-bs-student='" . json_encode($student) . "'>
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
    <script src="<?php echo $appUrl; ?>/public/js/admin.js"></script>
</html>