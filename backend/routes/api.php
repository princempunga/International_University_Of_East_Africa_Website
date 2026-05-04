<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\IntakeController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\SuperAdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/intakes/published', [IntakeController::class, 'getPublished']);
Route::get('/intakes/active', [IntakeController::class, 'getActive']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/latest', [NewsController::class, 'getLatest']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

Route::get('/gallery', [GalleryController::class, 'index']);

Route::post('/contact', [ContactController::class, 'submit']);
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);

Route::get('/orders/track/{orderNumber}', [OrderController::class, 'track']);
Route::post('/orders', [OrderController::class, 'store']);

// Protected routes (Any Admin)
Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
    
    // Intakes
    Route::apiResource('intakes', IntakeController::class);
    Route::post('/intakes/{id}/activate', [IntakeController::class, 'activate']);
    Route::post('/intakes/{id}/close', [IntakeController::class, 'close']);
    
    // Shop
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
    Route::post('/products/{id}/status', [ProductController::class, 'toggleStatus']);
    Route::post('/products/{id}/image', [ProductController::class, 'uploadImage']);
    
    Route::apiResource('categories', CategoryController::class)->except(['index']);
    
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::put('/orders/{id}/payment', [OrderController::class, 'updatePaymentStatus']);
    
    // News
    Route::apiResource('news', NewsController::class)->except(['index', 'show']);
    Route::post('/news/{id}/publish', [NewsController::class, 'publish']);
    Route::post('/news/{id}/unpublish', [NewsController::class, 'unpublish']);
    
    // Gallery
    Route::apiResource('gallery', GalleryController::class)->except(['index']);
    Route::post('/gallery/reorder', [GalleryController::class, 'reorder']);
    
    // Contacts
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{id}', [ContactController::class, 'show']);
    Route::post('/contacts/{id}/reply', [ContactController::class, 'reply']);
    Route::put('/contacts/{id}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
    
    // Newsletter
    Route::get('/newsletter/subscribers', [NewsletterController::class, 'getSubscribers']);

    Route::get('/stats', [SuperAdminController::class, 'getSystemStats']);
});

// Super Admin Only
Route::middleware(['auth:sanctum', 'isSuperAdmin'])->group(function () {
    Route::get('/admins', [SuperAdminController::class, 'getAdmins']);
    Route::post('/admins', [SuperAdminController::class, 'createAdmin']);
    Route::put('/admins/{id}/toggle', [SuperAdminController::class, 'toggleAdminStatus']);
    Route::delete('/admins/{id}', [SuperAdminController::class, 'deleteAdmin']);
    
    Route::get('/logs', [SuperAdminController::class, 'getActivityLogs']);
    Route::get('/settings', [SuperAdminController::class, 'getSettings']);
    Route::put('/settings', [SuperAdminController::class, 'updateSettings']);
});
