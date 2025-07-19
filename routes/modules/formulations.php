<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Formulations\FormulaController;

Route::resource('formulations\formulas', FormulaController::class);