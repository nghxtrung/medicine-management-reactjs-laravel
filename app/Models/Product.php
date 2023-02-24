<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'product';
    protected $appends = ["CategoryName", "BrandName", "Origin", "ProductAdditional"];

    protected function getCategoryNameAttribute()
    {
        return Category::where('Id', $this->CategoryId)->first()->Name;
    }

    protected function getBrandNameAttribute()
    {
        return Brand::where('Id', $this->BrandId)->first()->Name;
    }

    protected function getOriginAttribute()
    {
        return Brand::where('Id', $this->BrandId)->first()->Origin;
    }

    protected function getProductAdditionalAttribute()
    {
        return ProductAdditional::where('ProductId', $this->Id)->get();
    }
}
