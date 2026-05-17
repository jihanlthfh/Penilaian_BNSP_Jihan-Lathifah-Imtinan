<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Ambil daftar semua user untuk Admin
     */
    public function index()
    {
        // Ambil semua user dari database
        $users = User::orderBy('created_at', 'desc')->get();

        // Hitung total user berdasarkan role
        $totalCustomers = $users->where('role', 'customer')->count();
        $totalAdmins    = $users->where('role', 'admin')->count();

        return response()->json([
            'success' => true,
            'message' => 'Daftar semua user',
            'meta'    => [
                'total'           => $users->count(),
                'total_customers' => $totalCustomers,
                'total_admins'    => $totalAdmins,
            ],
            'data'    => $users
        ], 200);
    }

    /**
     * Detail satu user
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $user
        ], 200);
    }

    /**
     * Hapus user
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        // Jangan izinkan hapus diri sendiri (opsional)
        // if ($user->id === auth()->id()) { ... }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil dihapus'
        ], 200);
    }
}
