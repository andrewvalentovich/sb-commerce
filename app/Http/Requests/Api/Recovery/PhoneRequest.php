<?php

namespace App\Http\Requests\Api\Recovery;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PhoneRequest extends FormRequest
{
    public function rules(): array {
        return [
            'phone' => ['required', 'string', 'regex:/^\+?\d{11,15}$/', 'exists:users,phone'],
        ];
    }

    public function attributes() {
        return [
            'phone' => 'Номер телефона',
        ];
    }

    public function messages() {
        return [
            'phone.unique' => 'Учётная запись с таким номером телефона уже существует.',
            'phone.required' => 'Введите номер телефона.',
            'phone.regex' => 'Телефон указан не верно. Пример: +7 (999) 123-45-67.',
            'phone.exists' => 'Уётной записи с таким номером телефона не существует.',
        ];
    }
}
