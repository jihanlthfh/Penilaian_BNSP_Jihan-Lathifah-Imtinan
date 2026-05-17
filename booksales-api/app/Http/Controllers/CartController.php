<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Ambil isi keranjang user yang sedang login
     */
    public function index()
    {
        $userId = Auth::id();
        // Ambil data keranjang beserta detail bukunya
        $cartItems = Cart::with('book')->where('user_id', $userId)->get();

        return response()->json([
            'success' => true,
            'data' => $cartItems
        ]);
    }

    /**
     * Tambah atau update item di keranjang
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $userId = Auth::id();
        
        // Cek apakah buku ini sudah ada di keranjang user
        $cartItem = Cart::where('user_id', $userId)
                        ->where('book_id', $request->book_id)
                        ->first();

        if ($cartItem) {
            // Jika sudah ada, tambahkan jumlahnya
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity
            ]);
        } else {
            // Jika belum ada, buat baru
            $cartItem = Cart::create([
                'user_id' => $userId,
                'book_id' => $request->book_id,
                'quantity' => $request->quantity
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Berhasil ditambahkan ke keranjang!',
            'data' => $cartItem->load('book')
        ], 201);
    }

    /**
     * Update jumlah item di keranjang
     */
    public function update(Request $request, $id)
    {
        $cartItem = Cart::where('user_id', Auth::id())->find($id);
        
        if (!$cartItem) {
            return response()->json(['message' => 'Item tidak ditemukan'], 404);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'success' => true,
            'message' => 'Jumlah berhasil diperbarui'
        ]);
    }

    /**
     * Hapus item dari keranjang
     */
    public function destroy($id)
    {
        $cartItem = Cart::where('user_id', Auth::id())->find($id);
        
        if (!$cartItem) {
            return response()->json(['message' => 'Item tidak ditemukan'], 404);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item dihapus dari keranjang'
        ]);
    }
}
