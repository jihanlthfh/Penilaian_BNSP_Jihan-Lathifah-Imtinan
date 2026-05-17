<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// ============================================================
// MODEL: OrderItem
//
// Representasi tabel "order_items".
// Setiap baris = satu buku dalam satu pesanan.
// ============================================================

class OrderItem extends Model
{
    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'book_id',
        'book_title',
        'quantity',
        'price_per_item',
        'subtotal',
    ];


    // ─── RELASI 1: OrderItem milik satu Order ───
    // Cara pakai: $item->order->order_number
    public function order()
    {
        return $this->belongsTo(Order::class);
    }


    // ─── RELASI 2: OrderItem merujuk ke satu Book ───
    // nullable karena book_id bisa NULL (jika buku sudah dihapus admin)
    // Cara pakai: $item->book->cover_photo
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
