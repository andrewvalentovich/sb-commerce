<?php

use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\EnumController;
use Illuminate\Support\Facades\Route;

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

    // Me Routes...
    Route::get('me', [UserController::class, 'me'])->middleware('auth:sanctum');
});

Route::group([
    'prefix' => 'v1/admin',
    'as' => 'admin.',
    'middleware' => ['auth:sanctum', 'role.check.manager']
], function () {
    // Users resource routes...
    Route::apiResource('users', \App\Http\Controllers\Api\Admin\UsersController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->whereNumber('user');

    // Categories resource routes...
    Route::apiResource('categories', \App\Http\Controllers\Api\Admin\CategoriesController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->whereNumber('category');
    Route::put('categories/change_order', [\App\Http\Controllers\Api\Admin\CategoriesController::class, 'changeOrder']);
    Route::put('categories/sort', [\App\Http\Controllers\Api\Admin\CategoriesController::class, 'sort']);
    Route::get('categories/list', [\App\Http\Controllers\Api\Admin\CategoriesController::class, 'list']);
    Route::get('categories/tree', [\App\Http\Controllers\Api\Admin\CategoriesController::class, 'tree']);

    // Tags resource routes...
    Route::apiResource('tags', \App\Http\Controllers\Api\Admin\TagsController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->whereNumber('tag');
    Route::get('tags/list', [\App\Http\Controllers\Api\Admin\TagsController::class, 'list']);

    // Tags resource routes...
    Route::apiResource('products', \App\Http\Controllers\Api\Admin\ProductsController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->whereNumber('product');

    // Media resource routes...
    Route::apiResource('model.id.media', \App\Http\Controllers\Api\Admin\MediaController::class, ['parameters' => [
        'model' => 'model',
        'id' => 'id',
        'media' => 'media'
    ],
    ])->only([
//        'index',
        'store',
        'destroy'
    ])
        ->whereIn('model', ['product', 'category'])
        ->whereNumber('id');
    Route::put('model/{model}/id/{id}/media/change_order', [\App\Http\Controllers\Api\Admin\MediaController::class, 'changeOrder']);
});

Route::group([
    'prefix' => 'v1/enums',
    'as' => 'api.',
], function () {
    Route::get('user_roles', [EnumController::class, 'userRoles'])->middleware('auth:sanctum');
    Route::get('user_statuses', [EnumController::class, 'userStatuses']);
});
