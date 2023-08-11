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
        $items = DB::table('items')
    ->leftJoinSub(function ($query) {
        $query->select('item_id', DB::raw('SUM(amount) as total_client_amount'))
            ->from('client__invoices')
            ->groupBy('item_id');
    }, 'client_totals', function ($join) {
        $join->on('items.id', '=', 'client_totals.item_id');
    })
    ->leftJoinSub(function ($query) {
        $query->select('item_id', DB::raw('SUM(amount) as total_provider_amount'))
            ->from('provider__invoices')
            ->groupBy('item_id');
    }, 'provider_totals', function ($join) {
        $join->on('items.id', '=', 'provider_totals.item_id');
    })
    ->select('items.*', DB::raw('COALESCE(provider_totals.total_provider_amount, 0) - COALESCE(client_totals.total_client_amount, 0) as total_amount'))
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
