<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (! DB::table('role_user')->count()) {
            $this->call(LaratrustSeeder::class);
        }

        $this->call([
            UserSeeder::class,
        ]);
    }
}
