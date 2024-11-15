<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'Новинка',
            ],
            [
                'name' => 'Скидка',
            ],
            [
                'name' => 'Акция',
            ],
            [
                'name' => 'Распродажа',
            ]
        ];

        foreach ($data as $tagData) {
            $user = new Tag($tagData);
            $user->save();
        }
    }
}
