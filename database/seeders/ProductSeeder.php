<?php

namespace Database\Seeders;

use App\Services\CRUD\ProductService;
use Illuminate\Database\Seeder;
use \App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $productService = ProductService::make();
        $now = Carbon::now()->toDateTimeString();

        $props = [
            [
                'name' => 'Вот так ферма',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-825-4',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Друзья на ферме',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-828-5',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'На весёлой ферме',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-827-8',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Приключения синего трактора',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-826-1',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Дайвинг',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-799-8',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. День страшилок',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-801-8',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Заморские гости',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-800-1',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Киностудия',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-802-5',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений. В отпуске',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-797-4',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений. Путешествие',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-798-1',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Игра в доктора',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-793-6',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Талант Нудика',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-794-3',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Ремонт',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-795-0',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-796-7',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Вот так ферма',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-825-4',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Друзья на ферме',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-828-5',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'На весёлой ферме',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-827-8',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Приключения синего трактора',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-826-1',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Дайвинг',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-799-8',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. День страшилок',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-801-8',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Заморские гости',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-800-1',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Киностудия',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-802-5',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений. В отпуске',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-797-4',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений. Путешествие',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-798-1',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Игра в доктора',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-793-6',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Талант Нудика',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-794-3',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Ремонт',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-795-0',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-796-7',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Вот так ферма',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-825-4',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Друзья на ферме',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-828-5',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'На весёлой ферме',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-827-8',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Приключения синего трактора',
                'description' => '32 наклейки',
                'isbn' => '978-5-00033-826-1',
                'price' => 132,
                'year_of_production' => 2023,
                'count_per_package' => 30,
                'package_weight' => 4.2,
                'category_id' => 2,

                'media' => [
                    new UploadedFile(public_path('storage/seed/1.webp'), '1')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Дайвинг',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-799-8',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. День страшилок',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-801-8',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Заморские гости',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-800-1',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Киностудия',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-802-5',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений. В отпуске',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-797-4',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений. Путешествие',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 20 х 25 см, 12 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-798-1',
                'price' => 70,
                'year_of_production' => 2022,
                'count_per_package' => 50,
                'package_weight' => 4.2,
                'category_id' => 4,

                'media' => [
                    new UploadedFile(public_path('storage/seed/2.jpeg'), '2')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Игра в доктора',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-793-6',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Талант Нудика',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-794-3',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота. Ремонт',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-795-0',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
            [
                'name' => 'Три кота и море приключений',
                'description' => 'Книга-АППЛИКАЦИЯ в мягкой обложке, 14 х 20 см, 14 стр., 4 картинки-аппликации с героями м/ф "Три кота". Части рисунка нужно вырезать с одних страниц и приклеить на контур на специальных страницах.',
                'isbn' => '978-5-00033-796-7',
                'price' => 27,
                'year_of_production' => 2022,
                'count_per_package' => 100,
                'package_weight' => 2.5,
                'category_id' => 5,

                'media' => [
                    new UploadedFile(public_path('storage/seed/3.jpg'), '3')
                ],

                'tag_ids' => [
                    1
                ]
            ],
        ];

        foreach ($props as $item) {
            $res = $productService->store($item);
            dump($res->id);
        }

        foreach ($props as $item) {
            $res = $productService->store($item);
            dump($res->id);
        }

        foreach ($props as $item) {
            $res = $productService->store($item);
            dump($res->id);
        }

        foreach ($props as $item) {
            $res = $productService->store($item);
            dump($res->id);
        }
    }
}
