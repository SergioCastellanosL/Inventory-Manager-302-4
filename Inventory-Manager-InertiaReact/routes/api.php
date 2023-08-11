<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ClientInvoiceController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\ProviderInvoiceController;

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
Route::middleware(['auth', 'verified'])->group( function () {

    Route::get('/providers', [ProviderController::class, 'index']);
    Route::get('/providers/{id}', [ProviderController::class, 'show']);
    Route::get('/providers/invoices/{id}', [ProviderController::class, 'showInvoices']);
    Route::post('/providers', [ProviderController::class, 'create']);
    Route::put('/providers/{id}', [ProviderController::class, 'update']);
    Route::delete('/providers/{id}', [ProviderController::class, 'destroy']);

    Route::get('/items', [ItemController::class, 'index']);
    Route::get('/items/{id}', [ItemController::class, 'show']);
    Route::get('/items/invoices/{id}', [ItemController::class, 'showInvoices']);
    Route::post('/items', [ItemController::class, 'create']);
    Route::put('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);


    //Route::get('/clients', [ClientController::class, 'index']);
    Route::get('/clients/{id}', [ClientController::class, 'show']);
    Route::get('/clients/invoices/{id}', [ClientController::class, 'showInvoices']);
    Route::post('/clients', [ClientController::class, 'create']);
    Route::put('/clients/{id}', [ClientController::class, 'update']);
    //Route::delete('/clients/{id}', [ClientController::class, 'destroy']);

    Route::get('/provider_invoices', [ProviderInvoiceController::class, 'index']);
    Route::get('/provider_invoices/{id}', [ProviderInvoiceController::class, 'show']);
    Route::post('/provider_invoices', [ProviderInvoiceController::class, 'create']);
    Route::put('/provider_invoices/{id}', [ProviderInvoiceController::class, 'update']);
    Route::delete('/provider_invoices/{id}', [ProviderInvoiceController::class, 'destroy']);
  
    Route::get('/client_invoices', [ClientInvoiceController::class, 'index']);
    Route::get('/client_invoices/{id}', [ClientInvoiceController::class, 'show']);
    Route::post('/client_invoices', [ClientInvoiceController::class, 'create']);
    Route::put('/client_invoices/{id}', [ClientInvoiceController::class, 'update']);
    Route::delete('/client_invoices/{id}', [ClientInvoiceController::class, 'destroy']);

});
Route::get('/clients', [ClientController::class, 'index'])->middleware(['auth', 'verified']);
Route::delete('/clients/{id}', [ClientController::class, 'destroy'])->middleware(['auth', 'verified']);
