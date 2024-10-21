<?php

namespace Database\Seeders;

use App\Enums\Users\StatusesEnum;
use Illuminate\Database\Seeder;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now()->toDateTimeString();

        $data = [
            [
                'name' => 'Admin',
                'password' => '112233#',
                'email' => 'admin@mail.ru',
                'phone' => '+79999999999',
                'status' => StatusesEnum::Active,

                'roles' => 'admin'
            ],
            [
                'name' => 'manager',
                'password' => '112233#',
                'phone' => '+79999999991',
                'email' => 'manager@mail.ru',
                'status' => StatusesEnum::Active,

                'roles' => 'manager'
            ],
            [
                'name' => 'client',
                'password' => '112233#',
                'phone' => '+79999999992',
                'email' => 'client@mail.ru',
                'status' => StatusesEnum::Active,

                'roles' => 'client'
            ]
        ];

        foreach ($data as $userData) {
            if (User::whereEmail($userData['email'])->exists()) {
                continue;
            }

            $userData['phone_verified_at'] = $userData['created_at'] = $now;
            $userData['password'] = Hash::make($password = $userData['password']);

            $roles = $userData['roles'] ?? [];
            is_array($roles) || $roles = [$roles];
            unset($userData['roles']);

            $user = new User($userData);
            $user->save();

            $roles && $user->syncRoles($roles);
        }
    }
}
