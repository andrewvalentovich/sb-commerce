<?php

namespace App\Http\Requests\Api\Admin\Media;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array {
        return [
            'files' => 'required|array',
            'files.*' => ['file', 'mimes:pdf,jpg,jpeg,png,webp,mp4', 'max:'.(1024 * 10)],
//            'files.*.sort_column' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function attributes() {
        return [
            'files' => 'Массив медиа',
            'files.*' => 'Файл медиа',
//            'files.*.sort_column' => 'Порядковый номер медиа',
        ];
    }
}
