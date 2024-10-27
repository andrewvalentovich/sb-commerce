<?php

namespace App\Http\Requests\Api\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class SortRequest extends FormRequest
{
    public function rules(): array {
        return [
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'integer'],
            'items.*.sort_order' => ['required', 'integer', 'min:0'],
            'items.*.parent_id' => ['nullable', 'integer']
        ];
    }

    public function attributes() {
        return [
            'items' => 'Массив категорий',
            'items.*.id' => 'ID категории',
            'items.*.sort_order' => 'Порядок сортировки',
            'items.*.parent_id' => 'ID родительской категории',
        ];
    }
}
