<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// ============================================================
// MIGRATION: Tabel orders
//
// Tabel ini menyimpan HEADER / KEPALA pesanan.
// Satu baris = satu sesi checkout user.
//
// Contoh isi tabel:
// id | order_number  | user_id | total_price | status  | notes
//  1 | ORD-20250514  |    3    |   150000    | pending | "minta bubble wrap"
//
// Relasi:
//   orders → users    : MANY-TO-ONE (banyak order bisa dari satu user)
//   orders → order_items : ONE-TO-MANY (satu order punya banyak buku)
// ============================================================

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Nomor order unik yang ditampilkan ke user, contoh: "ORD-20250514-A1B2C3"
            $table->string('order_number')->unique();

            // Siapa yang memesan? → foreign key ke tabel users
            // onDelete('cascade') = jika user dihapus, semua ordernya ikut terhapus
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Total harga keseluruhan semua buku dalam pesanan ini
            // decimal(12, 2) = bisa simpan angka besar, contoh: 99999999.99
            $table->decimal('total_price', 12, 2);

            // Status pesanan
            // 'pending'   = baru dibuat, belum dikonfirmasi admin
            // 'confirmed' = admin sudah konfirmasi
            // 'cancelled' = dibatalkan
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');

            // Catatan/alamat pengiriman dari user (boleh kosong)
            $table->text('notes')->nullable();

            $table->timestamps(); // created_at dan updated_at otomatis
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
