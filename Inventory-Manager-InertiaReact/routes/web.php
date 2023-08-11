<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/edit', function (Request $request) {
    return Inertia::render('Edit', ['type'=> $request->query('type'),'id'=> $request->query('id'), 'typeTwo'=>$request->query('typeTwo')]);
})->middleware(['auth', 'verified'])->name('edit');
Route::get('/invoices', function (Request $request) {
    return Inertia::render('Invoices', ['type'=> $request->query('type'),'id'=> $request->query('id')]);
})->middleware(['auth', 'verified'])->name('invoices');
Route::get('/add', function (Request $request) {
    return Inertia::render('Add', ['type'=> $request->query('type')]);
})->middleware(['auth', 'verified'])->name('add');

Route::get('/clients', function () {
    return Inertia::render('Clients');
})->middleware(['auth', 'verified'])->name('clients');

Route::get('/providers', function () {
    return Inertia::render('Providers');
})->middleware(['auth', 'verified'])->name('providers');

Route::get('/items', function () {
    return Inertia::render('Items');
})->middleware(['auth', 'verified'])->name('items');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
