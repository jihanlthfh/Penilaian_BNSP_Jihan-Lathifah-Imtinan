<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Simpan pesanan baru ke database
     * POST /api/orders
     *
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk
        $validator = Validator::make($request->all(), [
            'customer_name'    => 'required|string|max:255',
            'customer_phone'   => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'items'            => 'required|array|min:1',
            'items.*.book_id'  => 'required|integer',
            'items.*.book_title' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price'    => 'required|numeric',
            'items.*.subtotal' => 'required|numeric',
            'total_price'      => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak valid',
                'errors'  => $validator->errors(),
            ], 422);
        }

        // Buat nomor order unik: ORD-20240101-123456
        $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -6));

        // Simpan order ke database
        $order = Order::create([
            'user_id'          => Auth::id(),  // ID user yang sedang login
            'order_number'     => $orderNumber,
            'total_price'      => $request->total_price,
            'status'           => 'pending',   // Default: menunggu konfirmasi
            'customer_name'    => $request->customer_name,
            'customer_phone'   => $request->customer_phone,
            'shipping_address' => $request->shipping_address,
            'notes'            => $request->notes ?? null,
        ]);

        // Simpan setiap item pesanan
        foreach ($request->items as $item) {
            OrderItem::create([
            'order_id'       => $order->id,
            'book_id'        => $item['book_id'],
            'book_title'     => $item['book_title'],
            'quantity'       => $item['quantity'],
            'price_per_item' => $item['price'],
            'subtotal'       => $item['subtotal'],
        ]);
        }

        // Ambil order lengkap beserta itemnya untuk dikirim balik ke React
        $order->load('items');

        return response()->json([
            'success'      => true,
            'message'      => 'Pesanan berhasil dibuat',
            'order'        => $order,
            'order_number' => $orderNumber,
        ], 201);
    }

    /**
     * Tampilkan semua pesanan milik user yang sedang login
     * GET /api/orders/my-orders
     */
    public function myOrders()
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('items')          // Sertakan item-item pesanan
            ->orderBy('created_at', 'desc')  // Terbaru dulu
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $orders,
        ]);
    }

    /**
     * [ADMIN] Tampilkan semua pesanan dari semua user
     * GET /api/admin/orders
     */
    public function adminIndex()
    {
        $orders = Order::with(['user', 'items'])  // Sertakan data user dan items
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $orders,
        ]);
    }

    /**
     * [ADMIN] Update status pesanan
     * PUT /api/admin/orders/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors(),
            ], 422);
        }

        $order->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Status pesanan diperbarui',
            'order'   => $order,
        ]);
    }
}
