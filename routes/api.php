<?php

use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\EnumController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');


Route::group([
    'prefix' => 'v1/auth',
    'as' => 'auth.',
], function () {
    // Authentication Routes...
    Route::post('login', [\App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
    Route::post('logout', [\App\Http\Controllers\Api\Auth\LoginController::class, 'logout'])->middleware('auth:sanctum');

    // Registration Routes...
    Route::post('register', [\App\Http\Controllers\Api\Auth\RegisterController::class, 'register']);

    // Recovery Routes...
    Route::post('recovery', [\App\Http\Controllers\Api\Auth\RecoveryController::class, 'recovery']);

    // Password Reset Routes...
//    Route::post('password/email', [\App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
//    Route::post('password/reset', [\App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reset']);

    Route::get('me', [UserController::class, 'me'])->middleware('auth:sanctum');
});

Route::group([
    'prefix' => 'v1/admin',
    'as' => 'admin.',
    'middleware' => 'auth:sanctum'
], function () {
    // Authentication Routes...
    Route::apiResource('users', \App\Http\Controllers\Api\Admin\UsersController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->whereNumber('user')
        ->middleware('role.check.manager');
});

Route::group([
    'prefix' => 'v1/enums',
    'as' => 'api.',
], function () {
    Route::get('user_roles', [EnumController::class, 'userRoles'])->middleware('auth:sanctum');
    Route::get('user_statuses', [EnumController::class, 'userStatuses']);
});
