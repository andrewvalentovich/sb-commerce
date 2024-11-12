<?php

namespace App\Http\Requests\Api\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
{
    public function rules(): array {
        return [
            'per_page' => 'nullable',
            'search' => 'nullable|string|max:255',
            'sort' => 'nullable|string|max:255',
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
            'tags' => 'Тэги',
            'tags.*' => 'Тэг',
        ];
    }
}
