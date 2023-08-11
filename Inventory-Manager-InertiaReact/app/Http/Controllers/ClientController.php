<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index () {
        $clients = Client::all();
        return response()->json($clients, 200);
    }

    public function show ($id) {
        $client = Client::find($id);
        return response()->json($client, 200);
    }

    public function showInvoices ($id) {
        $client = Client::find($id);
        return response()->json($client->invoices, 200);
    }

    public function create (){
        $client = new Client;
        $client->first_name = request('first_name');
        $client->last_name = request('last_name');
        $client->email = request('email');
        $client->phone = request('phone');
        $client->save();

        return response()->json($client, 201);
    }

    public function update ($id){
        $client = Client::find($id);
        $client->first_name = request('first_name');
        $client->last_name = request('last_name');
        $client->email = request('email');
        $client->phone = request('phone');
        $client->save();

        return response()->json($client, 200);
    }

    public function destroy ($id){
        $client = Client::find($id);
        $client->delete();

        return response()->json($client, 200); 
    }
}
