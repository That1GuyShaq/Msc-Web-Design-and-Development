<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Inventory\IngredientsController;

Route::resource('inventory\ingredients', IngredientsController::class)->names('inventory');