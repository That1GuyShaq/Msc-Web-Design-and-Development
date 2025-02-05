<?php
    require_once('App\Controllers\SessionController.php');
 
    $appUrl = Session::start('.env', 'Error');
    if (!isset($_SESSION['code'])) {
        $code    = 404;
        $message = '404 - Page Not Found';
    }else{
        $code    = $_SESSION['code'];
        $message = $_SESSION['message'];
    }
?>

<!DOCTYPE html5>
<html lang="en">
	<head>
		<title><?php echo $_SESSION['code'];?>-M9ASII</title>

		<meta http-equiv="content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link rel="stylesheet" href="<?php echo $appUrl; ?>/public/css/style.css" media="all"/>
        <link rel="stylesheet" href="<?php echo $appUrl; ?>/public/css/bootstrap.min.css" media="all"/>
	</head>
	<body class="bg-secondary-subtle">
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="row">
                <div class="col text-center">
                    <h1 class="text-danger display-1 fw-bolder"><?php echo $code;?></h1>
                    <p class="text-black-50"><?php echo $message; ?></p>
                    <a href="index.php" class="btn btn-sm btn-success"> <- Back to Home</a>
                </div>
            </div>
        </div>
	</body>
    <script src="<?php echo $appUrl; ?>/public/js/bootstrap.bundle.min.js"></script>
</html>