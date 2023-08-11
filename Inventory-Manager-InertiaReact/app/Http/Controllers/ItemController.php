<?php

namespace App\Http\Controllers;

use App\Models\item;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::select('items.*')
        ->selectRaw('SUM(provider__invoices.amount) - SUM(client__invoices.amount) as total_amount')
        ->leftJoin('client__invoices', 'items.id', '=', 'client__invoices.item_id')
        ->leftJoin('provider__invoices', 'items.id', '=', 'provider__invoices.item_id')
        ->groupBy('items.id')
        ->get();
        return response()->json($items, 200);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $items = Item::find($id);
        return response()->json($items, 200);
    }
    public function showInvoices ($id) {
        $item = Item::find($id);
        $ans = array_merge(json_decode(json_encode($item->clientsInvoices),true), json_decode(json_encode($item->providersInvoices),true));
        return response()->json($ans, 200);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $items = new Item;
        $items->name = request('name');
        $items->price = request('price');
        $items->save();

        return response()->json($items, 201);
    }



    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     *  Update the specified resource in storage.
     */

    public function update($id)
    {
        $items = Item::find($id);
        $items->name = request('name');
        $items->price = request('price');
        $items->save();

        return response()->json($items, 200);
    }

    // /**
    //  *
    //  */
    // public function update(Request $request, item $item)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $items = Item::find($id);
        $items->delete();

        return response()->json($items, 200);
    }
}
