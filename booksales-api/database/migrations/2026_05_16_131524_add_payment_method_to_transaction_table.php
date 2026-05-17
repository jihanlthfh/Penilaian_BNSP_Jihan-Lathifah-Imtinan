<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Tambah kolom payment_method setelah kolom total_amount
            // default 'cod' = Cash on Delivery / Bayar di Tempat
            $table->string('payment_method')->default('cod')->after('total_amount');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('payment_method');
        });
    }
};
