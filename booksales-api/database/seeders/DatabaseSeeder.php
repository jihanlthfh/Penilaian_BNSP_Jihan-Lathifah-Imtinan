<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\GenreSeeder;
use Database\Seeders\AuthorSeeder;
use Database\Seeders\BookSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\TransactionSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            GenreSeeder::class,
            AuthorSeeder::class,
            BookSeeder::class,
            UserSeeder::class,
            TransactionSeeder::class,
        ]);

    }
}
