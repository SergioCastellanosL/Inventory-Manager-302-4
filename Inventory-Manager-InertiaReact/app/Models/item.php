<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class item extends Model
{
    use HasFactory;
    public function clientsInvoices(): HasMany
    {
        return $this->hasMany(Client_Invoice::class);
    }
    public function providersInvoices(): HasMany
    {
        return $this->hasMany(Provider_Invoice::class);
    }
}
