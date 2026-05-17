<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genre;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    public function index() 
    {
        $genres = Genre::all();

        if ($genres->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!"
            ], 200);
        }

        return response()->json([
            "success" => true, 
            "message" => "Get all resources", 
            "data" => $genres
        ], 200);
    }

    public function store(Request $request)
    {
        // 1. validator
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        // 2. check validator error
        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => "Validation Error",
                "errors"  => $validator->errors()
            ], 422);
        }

        // 3. insert data
        $genre = Genre::create($request->all());

        return response()->json([
            "success" => true,
            "message" => "Resource created successfully",
            "data"    => $genre
        ], 201);
    }

    public function show(string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get detail resource',
            'data'    => $genre
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        // 1. mencari data
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found'
            ], 404);
        }

        // 2. validator
        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. update data ke database
        $genre->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Resource updated successfully!',
            'data'    => $genre
        ], 200);
    }

    public function destroy(string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found'
            ], 404);
        }

        $genre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Resource deleted successfully!'
        ], 200);
    }
}