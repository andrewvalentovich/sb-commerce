<?php

namespace App\Http\Requests\Api\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:65535'],
            'parent_id' => ['nullable', 'numeric', 'max:9999999999'],

            'media' => 'sometimes|array|min:0',
            'media.*' => ['file', 'mimes:pdf,jpg,jpeg,png,webp,mp4', 'max:'.(1024 * 10)],
        ];
    }

    public function attributes() {
        return [
            'name' => 'Название',
            'description' => 'Описание',
            'parent_id' => 'ID категории',

            'media' => 'Массив медиа',
            'media.*' => 'Файл медиа',
        ];
    }
}
