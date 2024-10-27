<?php

namespace App\Http\Requests\Api\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => 'required|string|max:255',
            'description' => ['nullable', 'string', 'max:65535'],
            'isbn' => ['nullable', 'string', 'max:20'],
            'year_of_production' => 'nullable|numeric|between:0,9999',
            'package_weight' => 'nullable|numeric|between:0,65535',
            'count_per_package' => 'nullable|numeric|between:0,65535',
            'price' => 'required|numeric|between:0,16777215',
            'ccfea' => 'nullable|numeric|between:0,18446744073709551615',

            'category_id' => ['nullable', 'numeric', 'exists:categories,id'],

            'tag_ids' => ['nullable', 'array'],
            'tag_ids.*' => ['nullable', 'numeric', 'exists:tags,id'],

            'media' => 'nullable|array|min:0',
            'media.*' => ['file', 'mimes:pdf,jpg,jpeg,png,webp,mp4', 'max:'.(1024 * 10)],
        ];
    }

    public function attributes() {
        return [
            'name' => 'Название',
            'description' => 'Описание',
            'isbn' => 'ISBN',
            'year_of_production' => 'Год издания',
            'package_weight' => 'Вес пачки в кг',
            'count_per_package' => 'Количество продукции в пачке',
            'price' => 'Цена',
            'ccfea' => 'Код ТН ВЭД',
            'category_id' => 'ID привязываемой категории',
            'tag_ids' => 'Тэги',
            'tag_ids.*' => 'ID тэга',
            'media' => 'Массив медиа',
            'media.*' => 'Элемент медиа',
        ];
    }
}
