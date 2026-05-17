<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        if ($user->role === 'admin') {
            $transactions = Transaction::with(['user', 'book'])
                ->latest()
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Daftar semua transaksi (Admin)',
                'data'    => $transactions
            ], 200);
        } else {
            $transactions = Transaction::with(['book'])
                ->where('customer_id', $user->id)
                ->latest()
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Riwayat transaksi Anda',
                'data'    => $transactions
            ], 200);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id'        => 'required|exists:books,id',
            'quantity'       => 'required|integer|min:1',
            // TAMBAHAN BARU: validasi payment_method
            // 'in:cod' → saat ini hanya terima nilai 'cod'
            // Nanti bisa ditambah: 'in:cod,transfer,qris'
            'payment_method' => 'required|in:cod',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors'  => $validator->errors()
            ], 422);
        }

        $user = Auth::guard('api')->user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        $book = Book::find($request->book_id);

        if ($book->stock < $request->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Stok buku tidak cukup. Tersisa: ' . $book->stock
            ], 400);
        }

        $orderNumber = 'ORD-' . strtoupper(uniqid());
        $totalAmount = $book->price * $request->quantity;

        $book->stock -= $request->quantity;
        $book->save();

        $transaction = Transaction::create([
            'order_number'   => $orderNumber,
            'customer_id'    => $user->id,
            'book_id'        => $request->book_id,
            'quantity'       => $request->quantity,
            'total_amount'   => $totalAmount,
            'payment_method' => $request->payment_method,  // ← SIMPAN KE DATABASE
            'status'         => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil dibuat',
            'data'    => $transaction->load(['user', 'book'])
        ], 201);
    }

    public function show($id)
    {
        $user        = Auth::guard('api')->user();
        $transaction = Transaction::with(['user', 'book'])->find($id);

        if (!$transaction) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        if ($user->role !== 'admin' && $transaction->customer_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Akses ditolak'], 403);
        }

        return response()->json(['success' => true, 'data' => $transaction], 200);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $transaction->update($request->only(['status', 'total_amount', 'payment_method']));

        return response()->json([
            'success' => true,
            'message' => 'Transaksi berhasil diupdate',
            'data'    => $transaction
        ], 200);
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $transaction->delete();

        return response()->json(['success' => true, 'message' => 'Transaksi berhasil dihapus'], 200);
    }
}
