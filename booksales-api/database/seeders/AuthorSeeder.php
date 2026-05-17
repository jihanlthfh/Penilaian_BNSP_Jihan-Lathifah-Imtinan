<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Author;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        Author::create(['name' => 'Tere Liye', 'bio' => 'Penulis Indonesia terkenal']);
        Author::create(['name' => 'Andrea Hirata', 'bio' => 'Penulis Laskar Pelangi']);
        Author::create(['name' => 'Pramoedya', 'bio' => 'Sastrawan besar Indonesia']);
        Author::create(['name' => 'Habiburrahman', 'bio' => 'Penulis religi']);
        Author::create(['name' => 'Dee Lestari', 'bio' => 'Penulis dan penyanyi']);
    }
}