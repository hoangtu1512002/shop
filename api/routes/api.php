<?php

use App\Http\Controllers\Api\Admin\User\UserController;
use App\Http\Controllers\Api\Auth\GoogleController;
use App\Http\Controllers\Api\Auth\JwtController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'web'], function () {
    Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google-login');
    Route::get('/auth/google/call-back', [GoogleController::class, 'handleGoogleCallback'])->name('google-login-callback');
});

Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [JwtController::class, 'login'])->withoutMiddleware('auth');
        Route::post('refresh', [JwtController::class, 'refresh'])->withoutMiddleware('auth');
        Route::post('logout', [JwtController::class, 'logout']);
        Route::get('profile', [JwtController::class, 'profile']);
    });

    Route::group(['prefix' => 'user'], function() {
        Route::get('all', [UserController::class, 'index']);
        Route::post('regist', [UserController::class, 'regist']);
        Route::get('verified', [UserController::class, 'verified'])->name('api.email.verified')->withoutMiddleware('auth');
    });
});
