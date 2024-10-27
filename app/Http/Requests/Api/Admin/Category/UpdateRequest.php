<?php

namespace App\Http\Requests\Api\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:65535'],
            'parent_id' => ['nullable', 'numeric', 'max:9999999999']
        ];
    }

    public function attributes() {
        return [
            'slug' => 'Отображение в URL',
            'name' => 'Название',
            'description' => 'Описание',
            'parent_id' => 'ID категории',
        ];
    }
}
