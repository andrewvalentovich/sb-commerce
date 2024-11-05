<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\Category;
use Illuminate\Support\Arr;

class CategorySeeder extends Seeder
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
                'name' => 'Синий трактор',
                'description' => '',
                'children' => [
                    [
                        'name' => 'РАСКРАСКИ серии "МИНИ-АЛЬБОМ С НАКЛЕЙКАМИ"',
                        'description' => 'Раскраска-альбом в мягкой МЕЛОВАННОЙ обложке формата 20 х 14 см, 32 стр, с НАКЛЕЙКАМИ - образцами для раскрашивания',
                    ],
                ]
            ],
            [
                'name' => 'Три кота',
                'description' => '',
                'children' => [
                    [
                        'name' => 'Аппликации А4 серии "Улыбка"',
                        'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                    ],
                    [
                        'name' => 'Аппликации А5',
                        'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                    ],
                ]
            ],
        ];

        foreach ($data as $categoryData) {
            $childrens = Arr::pull($categoryData, 'children');

            $category = new Category($categoryData);
            $category->save();

            if (count($childrens)) {
                foreach ($childrens as $children) {
                    $children['parent_id'] = $category->id;
                    Category::create($children);
                }
            }
        }
    }
}
