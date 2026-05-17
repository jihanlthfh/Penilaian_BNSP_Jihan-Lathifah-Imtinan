<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ── 1. Public Routes (tidak perlu login) ──────────────────────
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/genres/{id}', [GenreController::class, 'show']);
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);

Route::post('/contacts', [ContactController::class, 'store']);


// ── 2. User Authenticated (semua yang sudah login) ─────────────
Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);

    // Route Keranjang (FULL CRUD)
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});


// ── 3. Admin Only (harus login + role admin) ───────────────────
Route::middleware(['auth:api', 'role:admin'])->group(function () {

    // ── List User (BARU) ──────────────────────────────────────
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Transaksi
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);

    // Buku
    Route::post('/books', [BookController::class, 'store']);
    Route::put('/books/{id}', [BookController::class, 'update']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

    // Genre
    Route::post('/genres', [GenreController::class, 'store']);
    Route::put('/genres/{id}', [GenreController::class, 'update']);
    Route::delete('/genres/{id}', [GenreController::class, 'destroy']);

    // Author
    Route::post('/authors', [AuthorController::class, 'store']);
    Route::put('/authors/{id}', [AuthorController::class, 'update']);
    Route::delete('/authors/{id}', [AuthorController::class, 'destroy']);

    // Contacts
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::put('/contacts/{id}', [ContactController::class, 'update']);
});


// ── Route Bantu (cek koneksi database) ────────────────────────
Route::get('/cek-db', function () {
    return response()->json([
        'status'   => 'connected',
        'database' => \Illuminate\Support\Facades\DB::connection()->getDatabaseName(),
    ]);
});
