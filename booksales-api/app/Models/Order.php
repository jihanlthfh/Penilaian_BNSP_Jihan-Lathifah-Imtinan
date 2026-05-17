<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model Order
 *
 * Merepresentasikan satu transaksi checkout dari user.
 *
 * RELASI yang dimiliki model ini:
 *
 * 1. belongsTo User    → Order ini milik siapa?
 * 2. hasMany OrderItem → Order ini berisi buku-buku apa saja?
 */
class Order extends Model
{
    protected $table = 'orders';

    // Kolom-kolom yang boleh diisi via Order::create([...])
    protected $fillable = [
        'order_number',
        'user_id',
        'customer_name',
        'customer_address',
        'customer_phone',
        'total_amount',
        'status',
        'notes',
    ];

    /**
     * Relasi: Order ini dibuat oleh siapa?
     *
     * Cara baca: Order BELONGS TO (dimiliki oleh) satu User.
     * Gunakan: $order->user->name
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi: Order ini berisi item apa saja?
     *
     * Cara baca: Order HAS MANY (punya banyak) OrderItem.
     * Gunakan: $order->items (atau $order->items()->get())
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
