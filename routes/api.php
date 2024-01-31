<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\PostImageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware'=> 'auth:sanctum'], function (){
   Route::get('/users',[UserController::class, 'index']);
   Route::get('/users/{user}/posts',[UserController::class, 'post']);
   Route::get('/users/{user}/toggle_following',[UserController::class, 'toggleFollowing']);
   Route::get('/users/following_posts',[UserController::class, 'followingPost']);

   Route::post('/posts',[PostController::class, 'store']);
   Route::get('/posts',[PostController::class, 'index']);
   Route::post('/post_images',[PostImageController::class, 'store']);
   Route::get('/posts/{post}/toggle_like',[PostController::class, 'toggleLike']);
});



