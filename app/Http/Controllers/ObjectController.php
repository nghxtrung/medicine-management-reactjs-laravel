<?php

namespace App\Http\Controllers;

use App\Models\ObjectProduct;
use Illuminate\Http\Request;

class ObjectController extends Controller
{
    public function getListObject()
    {
        return response()->json(ObjectProduct::all());
    }
}
