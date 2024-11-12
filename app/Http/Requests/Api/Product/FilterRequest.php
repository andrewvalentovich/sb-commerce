<?php

namespace App\Http\Requests\Api\Product;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
{
    public function rules(): array {
        return [
            'per_page' => ['nullable'],
            'search' => 'nullable|string|max:255',
            'sort' => 'nullable|string|max:255',
            'price' => ['sometimes', 'array'],
            'price.min' => ['sometimes', 'numeric', 'min:0'],
            'price.max' => ['sometimes', 'numeric', 'min:0'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['nullable', 'string', 'exists:categories,slug'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['nullable', 'string', 'exists:tags,slug'],
        ];
    }

    public function attributes() {
        return [
            'per_page' => 'Записей на странице',
            'search' => 'Поиск',
            'sort' => 'Сортировка',
            'categories' => 'Категории',
            'categories.*' => 'Категория',
            'price' => 'Цена',
            'price.min' => 'Минимальная цена',
            'price.max' => 'Максимальная цена',
            'tags' => 'Тэги',
            'tags.*' => 'Тэг',
        ];
    }
}
