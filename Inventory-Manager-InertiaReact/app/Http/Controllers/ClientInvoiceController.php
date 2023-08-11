<?php

namespace App\Http\Controllers;

use App\Models\Client_Invoice;
use App\Models\Item;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client_invoices = Client_Invoice::all();
        return response()->json($client_invoices, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $client_invoices = new Client_Invoice;
        $item = Item::find(request('item_id'));
        $client = Client::find(request('client_id'));
        $client_invoices->amount = request('amount');
        $client_invoices->user_id = Auth::id();
        $client_invoices->client_id = $client->id;
        $client_invoices->item_id = $item->id;
        $client_invoices->total_price = request('amount') * $item->price;
        $client_invoices->save();
        return response()->json($client_invoices, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client_invoices = Client_Invoice::find($id);
        return response()->json($client_invoices, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client_Invoice $client_Invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id)
    {
        $client_invoices = Client_Invoice::find($id);
        $item = Item::find(request('item_id'));
        $client = Client::find(request('client_id'));
        $client_invoices->amount = request('amount');
        $client_invoices->user_id = Auth::id();
        $client_invoices->client_id = $client->id;
        $client_invoices->item_id = $item->id;
        $client_invoices->total_price = request('amount') * $item->price;
        $client_invoices->save();
        return response()->json($client_invoices, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client_invoices = Client_Invoice::find($id);
        $client_invoices->delete();
        return response()->json($client_invoices, 200);
    }
}
