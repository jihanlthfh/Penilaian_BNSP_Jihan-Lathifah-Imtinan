<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// ============================================================
// MIGRATION: Tabel order_items
//
// Tabel ini menyimpan DETAIL BUKU di setiap pesanan.
// Satu baris = satu buku dalam satu pesanan.
//
// Contoh isi tabel:
// id | order_id | book_id | book_title      | quantity | price_per_item | subtotal
//  1 |    1     |    5    | "Harry Potter"  |    2     |    75000       | 150000
//  2 |    1     |    8    | "Laskar Pelangi" |   1     |    60000       | 60000
//
// Mengapa kita simpan book_title, price_per_item, dan subtotal?
// → Karena data buku bisa berubah (harga naik, judul diubah admin).
// → Kita perlu menyimpan "snapshot" harga saat transaksi terjadi.
// → Ini praktik standar di sistem e-commerce.
//
// Relasi:
//   order_items → orders : MANY-TO-ONE (banyak item dalam satu order)
//   order_items → books  : MANY-TO-ONE (satu buku bisa ada di banyak order)
// ============================================================

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            // Milik order mana? → foreign key ke tabel orders
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');

            // Buku apa? → foreign key ke tabel books
            // onDelete('set null') = jika buku dihapus admin, kolom ini jadi NULL
            //                       tapi riwayat order tetap ada (tidak ikut terhapus)
            $table->foreignId('book_id')->nullable()->constrained('books')->onDelete('set null');

            // Simpan judul buku saat transaksi (snapshot)
            $table->string('book_title');

            // Berapa buku yang dibeli
            $table->integer('quantity');

            // Harga per buku saat transaksi (snapshot, bukan harga sekarang)
            $table->decimal('price_per_item', 12, 2);

            // Subtotal = quantity × price_per_item (disimpan agar mudah dihitung)
            $table->decimal('subtotal', 12, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
