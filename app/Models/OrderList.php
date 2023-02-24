<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'orderlist';

    protected $appends = ["OrderDetail"];

    protected function getOrderDetailAttribute()
    {
        return OrderDetail::where('OrderId', $this->Id)->get();
    }
}
