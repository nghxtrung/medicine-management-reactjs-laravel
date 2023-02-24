<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function getListCategory()
    {
        return response()->json(Category::all());
    }

    public function getCategory(Request $request)
    {
        $categoryId = $request->query('id');
        return response()->json(Category::where('Id', $categoryId)->first());
    }

    public function getListCategoryLevel(Request $request)
    {
        $level = $request->query('level');
        return response()->json(Category::where('level', $level)->get());
    }
}
