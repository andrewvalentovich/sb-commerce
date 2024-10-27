<?php

namespace App\Http\Requests\Api\Admin\Tag;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255']
        ];
    }

    public function attributes() {
        return [
            'name' => 'Название',
            'slug' => 'Отображение в URL',
        ];
    }
}
