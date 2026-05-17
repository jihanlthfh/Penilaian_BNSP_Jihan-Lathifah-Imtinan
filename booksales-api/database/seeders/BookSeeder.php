<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;
use App\Models\Author;
use App\Models\Genre;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil ID secara dinamis
        $action = Genre::where('name', 'Action')->first()->id;
        $romance = Genre::where('name', 'Romance')->first()->id;
        $fantasy = Genre::where('name', 'Fantasy')->first()->id;

        $tereLiye = Author::where('name', 'Tere Liye')->first()->id;
        $andreaHirata = Author::where('name', 'Andrea Hirata')->first()->id;
        $deeLestari = Author::where('name', 'Dee Lestari')->first()->id;

        $books = [
            [
                'title' => 'Bumi',
                'description' => 'Petualangan di dunia paralel yang penuh imajinasi.',
                'price' => 95000,
                'stock' => 20,
                'cover_photo' => 'bumi.jpg',
                'genre_id' => $fantasy,
                'author_id' => $tereLiye,
            ],
            [
                'title' => 'Laskar Pelangi',
                'description' => 'Kisah inspiratif anak-anak Belitong mengejar mimpi.',
                'price' => 85000,
                'stock' => 15,
                'cover_photo' => 'laskar_pelangi.jpg',
                'genre_id' => $action,
                'author_id' => $andreaHirata,
            ],
            [
                'title' => 'Perahu Kertas',
                'description' => 'Kisah radar neptunus dan pencarian jati diri.',
                'price' => 88000,
                'stock' => 30,
                'cover_photo' => 'perahu_kertas.jpg',
                'genre_id' => $romance,
                'author_id' => $deeLestari,
            ],
            [
                'title' => 'Pulang',
                'description' => 'Pertarungan emosional dan fisik di dunia ekonomi shadow.',
                'price' => 90000,
                'stock' => 12,
                'cover_photo' => 'pulang.jpg',
                'genre_id' => $action,
                'author_id' => $tereLiye,
            ],
            [
                'title' => 'Supernova',
                'description' => 'Perpaduan sains, spiritualitas, dan cinta.',
                'price' => 110000,
                'stock' => 10,
                'cover_photo' => 'supernova.jpg',
                'genre_id' => $fantasy,
                'author_id' => $deeLestari,
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}