<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = Provider::all();
        return response()->json($providers, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $provider = new Provider();
        $provider->name = request('name');
        $provider->email = request('email');
        $provider->address = request('address');
        $provider->phone = request('phone');
        $provider->save();

        return response()->json($provider, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $provider = new Provider();
    //     $provider->name = $request->input('name');
    //     $provider->email = $request->input('email');
    //     $provider->address = $request->input('address');
    //     $provider->phone = $request->input('phone');
    //     $provider->save();

    //     return response()->json($provider, 201);
    // }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $provider = Provider::find($id);
        return response()->json($provider, 200);
    }

    public function showInvoices ($id) {
        $provider = Provider::find($id);
        return response()->json($provider->invoices, 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Provider $provider)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update( $id)
    {
    $provider = Provider::find($id);
    $provider->name = request('name');
    $provider->email = request('email');
    $provider->address = request('address');
    $provider->phone = request('phone');
    $provider->save();

    return response()->json($provider, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $provider = Provider::find($id);
        $provider->delete();

        return response()->json($provider, 200);
    }
}
