<?php
    require_once('App/Controllers/Controller.php');
    
$appUrl = Controller::env('.env','APP_URL' );
    session_start();

    if (isset($_SESSION['data'])) {
        $data = json_decode(json_encode($_SESSION['data'][0]), false);
        session_destroy();
    }else if (isset($_SESSION['id'])) {
        $controller = new Controller();
        $controller->redirectToHome($_SESSION['role']);
    }
?>

<!DOCTYPE html5>
<html lang="en">
	<head>
		<title>Login-M9ASII</title>

		<meta http-equiv="content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

		<link rel="stylesheet" href="public/css/style.css" media="all"/>
        <link rel="stylesheet" href="public/css/bootstrap.min.css" media="all"/>
	</head>
	<body>
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="row">
                <div class="col">
                    <h1 class="text-center">M9ASII</h1>
                    <div class="card" style="width: 25rem;">
                        <div class="card-body">
                            <h3 class="card-title">Login</h3>
                            <p class="text-small text-muted <?= isset($data->errors->form) ? 'is-invalid' : '' ?> ">Enter your credentials to access your account</p>
                            <p class="invalid-feedback mb-2">
                                <?php echo $data->errors->form; ?>
                            </p>

                            <form action="<?php echo $appUrl; ?>/App/Process/login.php" method="post" class="row g-3 needs-validation" novalidate id="loginForm">
                                
                                <div class="col-12">
                                    <input type="email" class="form-control <?= isset($data->errors->email) ? 'is-invalid' : '' ?> " id="email" name="email" autocomplete="email" placeholder="Email" value="<?= isset($data->email) ? $data->email : '' ?>">
                                    <div class="invalid-feedback">
                                        <?php echo $data->errors->email ?>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <input type="password" class="form-control <?= isset($data->errors->password) ? 'is-invalid' : '' ?> <?= empty($data->errors->password) ?? 'is-valid' ?>" id="password" name="password" autocomplete="current-password" placeholder="Password">
                                    <div class="invalid-feedback">
                                        <?php echo $data->errors->password; ?>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <button type="submit" class="btn btn-success mt-3 float-end" name="submit">Login</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</body>
    <script src="public/js/bootstrap.bundle.min.js"></script>
</html>