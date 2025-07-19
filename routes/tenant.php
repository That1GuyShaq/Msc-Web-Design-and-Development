<?php

declare(strict_types=1);

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Formulation\PhaseController;
use App\Http\Controllers\Formulation\MethodController;
use App\Http\Controllers\Inventory\SupplierController;
use App\Http\Controllers\Formulation\FormulaController;
use App\Http\Controllers\Inventory\IngredientController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Inventory\SupplierIngredientController;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::domain('{tenant}.' . config('app.domain'))->middleware(['web', 'auth', 'verified', 'tenancy'])->withoutScopedBindings()->group(function () {
    
    Route::get('/', function () { return Inertia::render('welcome'); });
    Route::get('dashboard', function () {return Inertia::render('dashboard');})->name('dashboard');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('tenant.logout');

    // Route::resource('formulation/formulas', FormulaController::class)
    // ->scoped(['formula' => 'slug'])
    // ->names('formulation.formulas');

    Route::controller(FormulaController::class)->group(function () {
        Route::get('formulation/formulas', 'index')->name('formulation.formulas.index');
        Route::get('formulation/formulas/{formula}','show')->name('formulation.formulas.show');
        Route::get('formulation/formulas/create', 'create')->name('formulation.formulas.create');
        Route::get('formulation/formulas/{formula}/edit', 'edit')->name('formulation.formulas.edit');
        Route::post('formulation/formulas', 'store')->name('formulation.formulas.store');
        Route::put('formulation/formulas/{formula}', 'update')->name('formulation.formulas.update');
        Route::delete('formulation/formulas/{formula}', 'destroy')->name('formulation.formulas.destroy');

        Route::get('formulation/formulas/{formula}/notes/create',  'createEditNotes')->name('formulation.formula.notes.create');
        Route::get('formulation/formulas/{formula}/notes/edit',  'createEditNotes')->name('formulation.formula.notes.edit');
        Route::put('formulation/formulas/{formula}/notes',  'updateNotes')->name('formulation.formula.notes.update');

        Route::put('formulation/formulas/{formula}/archive', 'archive')->name('formulation.formulas.archive');
        Route::put('formulation/formulas/{formula}/version', 'version')->name('formulation.formulas.version');
    });

    Route::controller(PhaseController::class)->group(function () {
        Route::get('formulation/formulas/{formula}/phases/create', 'create')->name('formulation.formula.phases.create');
        Route::get('formulation/formulas/{formula}/phases/edit', 'edit')->name('formulation.formula.phases.edit');
        Route::post('formulation/formulas/{formula}/phases', 'store')->name('formulation.formula.phases.store');
        Route::put('formulation/formulas/{formula}/phases', 'update')->name('formulation.formula.phases.update');

    });

    Route::controller(MethodController::class)->group(function () {
        Route::get('formulation/formulas/{formula}/methods/create', 'create')->name('formulation.formula.methods.create');
        Route::get('formulation/formulas/{formula}/methods/edit', 'edit')->name('formulation.formula.methods.edit');
        Route::post('formulation/formulas/{formula}/methods', 'store')->name('formulation.formula.methods.store');
        Route::put('formulation/formulas/{formula}/methods', 'update')->name('formulation.formula.methods.update');

    });

    Route::resource('inventory/ingredients', IngredientController::class)
    ->scoped(['ingredient' => 'slug'])
    ->names('inventory.ingredients');

    Route::group([
        'as' => 'inventory.ingredients', 
        'scoped' => ['ingredient' => 'slug'],
        'prefix' => 'inventory/ingredients/{ingredient}' ], function () {
        Route::patch('restore', [IngredientController::class, 'restore'])->name('.restore');
        Route::delete('force-delete', [IngredientController::class, 'forceDelete'])->name('.force_delete');
    });

    Route::resource('inventory/suppliers', SupplierController::class)
    ->scoped(['supplier' => 'slug'])
    ->names('inventory.suppliers');

    Route::group([
        'as' => 'inventory.suppliers', 
        'scoped' => ['supplier' => 'slug'],
        'prefix' => 'inventory/suppliers/{supplier}' ], function () {
        
        Route::patch('restore', [SupplierController::class, 'restore'])->name('.restore');
        Route::patch('restore', [SupplierIngredientController::class, 'restore'])->name('.restore');

        Route::delete('force-delete', [SupplierController::class, 'forceDelete'])->name('.force_delete');
        Route::delete('force-delete', [SupplierIngredientController::class, 'forceDelete'])->name('.force_delete');

        Route::post('ingredients/store', [SupplierIngredientController::class, 'store'])->name('.ingredients.store');
        Route::put('ingredients/update/{ingredient}', [SupplierIngredientController::class, 'update'])->name('.ingredients.update');
        Route::delete('ingredients/delete/{ingredient}', [SupplierIngredientController::class, 'destroy'])->name('.ingredients.destroy');
    });
    
    require __DIR__.'/settings.php';
});
