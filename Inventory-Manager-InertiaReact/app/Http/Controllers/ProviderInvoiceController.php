<?php

namespace App\Http\Controllers;

use App\Models\Provider_Invoice;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Provider;
use Illuminate\Support\Facades\Auth;

class ProviderInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $provider_Invoices = Provider_invoice::all();
        return response()->json($provider_Invoices, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $provider_Invoices = new Provider_Invoice;
        $item = Item::find(request('item_id'));
        $provider= Provider::find(request('provider_id'));
        $provider_Invoices->amount = request('amount');
        $provider_Invoices->user_id = Auth::id();
        $provider_Invoices->provider_id = $provider->id;
        $provider_Invoices->item_id=$item->id;
        $provider_Invoices->total_price = request('amount') * $item->price;
        $provider_Invoices->save();

        return response()->json($provider_Invoices, 201);
    }

    
    // public function store(Request $request)
    // {
    //     $provider_Invoices = new $provider_Invoices();
    //     $provider_Invoices->user_id = request->user_id;
    //     $provider_Invoices->content = request->content;
    //     $provider_Invoices->user_id = Auth::id();
    //     $provider_Invoices->save();

    //     return response()->json($providers, 201);
    // }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $provider_Invoices = Provider_invoice::find($id);
        return response()->json($provider_Invoices, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Provider_Invoice $provider_Invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id)
    {
        $provider_Invoices = Provider_Invoice::find($id);
        $item = Item::find(request('item_id'));
        $provider= Provider::find(request('provider_id'));
        $provider_Invoices->amount = request('amount');
        $provider_Invoices->user_id = Auth::id();
        $provider_Invoices->provider_id = $provider->id;
        $provider_Invoices->item_id=$item->id;
        $provider_Invoices->total_price = request('amount') * $item->price;
        $provider_Invoices->save();

    return response()->json($provider_Invoices, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $provider_Invoices = Provider_Invoice::find($id);
        $provider_Invoices->delete();

        return response()->json($provider_Invoices, 200);
    }
}
