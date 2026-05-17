<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
{
    // 1. Setup & Cek Validator
    $validator = Validator::make($request->all(), [
        'name'     => 'required|string|max:255',
        'email'    => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // 2. Create User (Password di-hash pakai bcrypt)
    $user = \App\Models\User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => bcrypt($request->password),
        'role'     => 'customer', // Otomatis jadi customer
    ]);

    if ($user) {
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data'    => $user
        ], 201);
    }

    return response()->json(['success' => false], 409);
}

public function login(Request $request)
{
    // 1 & 2. Validasi
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // 3. Get Credentials
    $credentials = $request->only('email', 'password');

    // 4. Check Failed
    if (!$token = auth()->guard('api')->attempt($credentials)) {
        return response()->json([
            'success' => false,
            'message' => 'Email atau password Anda salah'
        ], 401);
    }

    // 5. Check Success
    return response()->json([
        'success' => true,
        'message' => 'Login successfully',
        'user'    => auth()->guard('api')->user(),
        'token'   => $token
    ], 200);
}

public function logout(Request $request)
{
    try {
        // Mengambil token yang sedang aktif dan menghancurkannya (invalidate)
        \Tymon\JWTAuth\Facades\JWTAuth::invalidate(\Tymon\JWTAuth\Facades\JWTAuth::getToken());

        return response()->json([
            'success' => true,
            'message' => 'Logout successfully'
        ], 200);
    } catch (\Exception $e) {
        // Jika gagal (misal tokennya memang sudah tidak ada)
        return response()->json([
            'success' => false,
            'message' => 'Logout failed'
        ], 500);
    }
}
}