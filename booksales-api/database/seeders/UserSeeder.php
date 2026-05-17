<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \App\Models\User::create([
        'name'     => 'Admin Toko',
        'email'    => 'admin@example.com',
        'password' => bcrypt('admin123'),
        'role'     => 'admin'
    ]);

    \App\Models\User::create([
        'name'     => 'jihan lathifah',
        'email'    => 'jihan@example.com',
        'password' => bcrypt('customer123'),
        'role'     => 'customer'
    ]);
    }
}