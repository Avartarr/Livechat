<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/ForgotPassword', [ForgotPasswordController::class, 'sendResetLinkEmail']);

Route::post('messages', [\App\Http\Controllers\ChatController::class, 'message']);

Route::post('/register', [\App\Http\Controllers\RegistrationController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

