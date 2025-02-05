<?php
require_once 'Controller.php';

Class Session extends Controller {
    
    public static function start(string $envFile = '.env', string $role): mixed {
        session_start([
            'cookie_lifetime' => 3600, // 1 hour
            'gc_maxlifetime' => 3600, // 1 hour
        ]);

        $appUrl = Controller::env($envFile, 'APP_URL');
        if (isset($_SESSION) && isset($_SESSION['id'])) {
            if (isset($_SESSION['role']) && $_SESSION['role'] === $role) {
                if (isset($_SESSION['code'])) {
                    unset($_SESSION['code']);
                    unset($_SESSION['message']);
                }
                if (isset($_SESSION['errors'])) {
                    unset($_SESSION['errors']);
                }
                if (isset($_SESSION['form'])) {
                    unset($_SESSION['form']);
                }
                return $appUrl;
            }else{
                session_destroy();
                
                session_start();
                
                $_SESSION['code'] = '409';
                $_SESSION['message'] = 'You are not allowed to access this page.';
                header("Location: $appUrl/error.php");
                exit;
            }
        } else {
            header("Location: $appUrl/index.php");
            exit;
        }
        
    }

    public static function destroy(string $envFile = '.env'): void 
    {
        session_start();
        session_destroy();

        $appUrl = Controller::env($envFile, 'APP_URL');
        header( "Location: $appUrl/index.php" );
    }
}