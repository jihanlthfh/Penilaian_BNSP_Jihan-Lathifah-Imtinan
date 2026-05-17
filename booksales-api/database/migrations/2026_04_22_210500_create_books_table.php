<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('books', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description'); // Tambahkan ini
        $table->integer('price');
        $table->integer('stock'); // Tambahkan ini
        $table->string('cover_photo'); // Tambahkan ini
        $table->unsignedBigInteger('genre_id'); // Tambahkan ini
        $table->unsignedBigInteger('author_id');
        $table->timestamps();

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
