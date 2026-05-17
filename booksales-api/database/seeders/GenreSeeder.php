<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        Genre::create([
            'name' => 'Action',
            'description' => 'Genre yang menekankan pada adegan aksi, pertempuran, dan kecepatan.'
        ]);

        Genre::create([
            'name' => 'Romance',
            'description' => 'Genre yang menekankan pada hubungan romantis dan cinta.'
        ]);

        Genre::create([
            'name' => 'Fantasy',
            'description' => 'Genre yang mengeksplorasi imajinasi dan dunia yang tidak nyata.'
        ]);
    }
}