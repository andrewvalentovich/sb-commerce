<?php

namespace App\Http\Requests\Api\Admin\User;

use App\Enums\Users\RolesEnum;
use App\Enums\Users\StatusesEnum;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
{
    public function rules(): array {
        $inStatuses = implode(',', StatusesEnum::toNameArray());

        return [
            'search' => 'nullable|string|max:255',
            'sort' => 'nullable|string|max:255',
            'roles' => ['nullable', 'array'],
            'roles.*' => ['nullable', 'string', 'exists:roles,name'],
            'statuses' => ['nullable', 'array', 'max:' . count(StatusesEnum::cases())],
            'statuses.*' => ['nullable', 'string', "in:$inStatuses"],
        ];
    }

    public function attributes() {
        return [
            'search' => 'Поиск',
            'sort' => 'Сортировка',
            'roles' => 'Роли',
            'roles.*' => 'Роль',
            'statuses' => 'Статусы',
            'statuses.*' => 'Статус',
        ];
    }

    public function messages() {
        return [
            'sort.string' => 'Поле сортировки должно быть строкой',
            'sort.max' => 'Длина поля сортировки не должна превышать :max символов',
            'role.in' => 'Такой роли не существует',
            'status.in' => 'Такого статуса не существует',
        ];
    }
}
