<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectProduct extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'Object';

    protected $appends = ["ListProduct"];

    protected function getListProductAttribute()
    {
        return Product::where('ObjectId', $this->Id)->get();
    }
}
