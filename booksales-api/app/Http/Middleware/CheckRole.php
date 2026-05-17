<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            return response()->json(['message' => 'Token is invalid or expired'], 401);
        }

        // Jika tidak ada role yang ditentukan di route, default ke 'admin'
        if (empty($roles)) {
            $roles = ['admin'];
        }

        if (!in_array($user->role, $roles)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}