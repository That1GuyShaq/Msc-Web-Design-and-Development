<?php

$appHost = parse_url(env('APP_URL'), PHP_URL_HOST);
// Escape dots for regex, e.g., altuvis.test becomes altuvis\.test
$escapedAppHost = str_replace('.', '\.', $appHost);

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => [
        '/',         // Add this explicit entry for the root path
        'register',  // Your main registration endpoint
        'login',     // Your main login endpoint
        'logout',    // Your logout endpoint
        'dashboard', // The primary dashboard route on tenant domains
        'web/*',     // A wildcard for most general web routes on both central and tenant domains
        'home',      // The home route on central domains
        'world/*',   // A wildcard for world routes
        // 'sanctum/csrf-cookie', // Only if you are actually using Sanctum's CSRF
        // 'api/*',               // Only if you have API routes
    ],

    'allowed_methods' => ['*'],

    // Cannot be ['*'] when supports_credentials is true
    'allowed_origins' => [
        env('APP_URL'),          // Your central domain
        env('APP_URL') . ':5173',          // Your Vite dev server
        'https://vite.' . env('APP_DOMAIN') . ':5173',     // Your Vite dev server (if you use this URL)
        // No need for http://localhost:3000, http://localhost, or https://localhost
        // because your Vite server is running on altuvis.test:5173 directly.
        // 'https://*.' . env('APP_DOMAIN'),
    ],

    // Needs to include patterns for your tenant domains
    'allowed_origins_patterns' => [
        // Pattern for subdomains of APP_URL (HTTPS)
        '/^https:\/\/([a-z0-9-]+\.)*' . $escapedAppHost . '$/',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0, // 0 means no caching of preflight results, good for debugging

    'supports_credentials' => true, // Keep this true as you're using session-based auth

];
