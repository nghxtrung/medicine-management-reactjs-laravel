<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ObjectController;
use App\Http\Controllers\OrderListController;

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

Route::prefix('category')->group(function () {
    Route::get('/getCategory', [CategoryController::class, 'getCategory']);
    Route::get('/getListCategory', [CategoryController::class, 'getListCategory']);
    Route::get('/getListCategoryLevel', [CategoryController::class, 'getListCategoryLevel']);
});

Route::prefix('brand')->group(function () {
    Route::get('/getListBrand', [BrandController::class, 'getListBrand']);
});

Route::prefix('object')->group(function () {
    Route::get('/getListObject', [ObjectController::class, 'getListObject']);
});

Route::prefix('user')->group(function () {
    Route::get('/getUser', [UserController::class, 'getUser']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
});

Route::prefix('product')->group(function () {
    Route::post('/getProduct', [ProductController::class, 'getProduct']);
    Route::get('/getListOutstandingProduct', [ProductController::class, 'getListOutstandingProduct']);
    Route::get('/getListProduct', [ProductController::class, 'getListProduct']);
    Route::get('/getSearchListProduct', [ProductController::class, 'getSearchListProduct']);
    Route::post('/insertProduct', [ProductController::class, 'insertProduct']);
});

Route::prefix('cart')->group(function () {
    Route::get('/getCartUser', [CartController::class, 'getCartUser']);
    Route::post('/updateCart', [CartController::class, 'updateCart']);
    Route::post('/updateProductCart', [CartController::class, 'updateProductCart']);
    Route::post('/removeProductCart', [CartController::class, 'removeProductCart']);
    Route::post('/submitOrder', [CartController::class, 'submitOrder']);
});

Route::prefix('order')->group(function () {
    Route::get('/getListOrder', [OrderListController::class, 'getListOrder']);
    Route::get('/getListOrderUser', [OrderListController::class, 'getListOrderUser']);
    Route::post('/changeStatusOrder', [OrderListController::class, 'changeStatusOrder']);
    Route::get('/deleteOrder', [OrderListController::class, 'deleteOrder']);
});
