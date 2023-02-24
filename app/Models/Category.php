<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'category';

    protected $appends = ["CountProduct", "ListProduct"];

    protected function getCountProductAttribute()
    {
        return Product::where('CategoryId', $this->Id)->count();
    }

    protected function getListProductAttribute()
    {
        return Product::where('CategoryId', $this->Id)->get();
    }
}
