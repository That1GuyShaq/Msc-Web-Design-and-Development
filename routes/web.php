<?php

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RedirectTenantIfAuthenticated;

Route::domain(config('app.domain'))->group(function () {
    Route::get('/', function () { return Inertia::render('welcome'); })->middleware([RedirectTenantIfAuthenticated::class])->name('home');

    Route::prefix('world')->as('world.')->group(function () {
        Route::get('countries/all', function () {
            return Controller::countries();
        })->name('countries');

        Route::get('states/{country_code}', function () {
            return Controller::states(country_code: request('country_code'));
        })->name('states');

        Route::get('cities/{state_id}', function () {
            return Controller::cities(state_id: request('state_id'));
        })->name('cities');
    });

    require __DIR__.'/auth.php';
});