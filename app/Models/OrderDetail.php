<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'orderdetail';

    protected $appends = ["ProductInfo"];

    protected function getProductInfoAttribute()
    {
        return Product::where('Id', $this->ProductId)->first();
    }
}
