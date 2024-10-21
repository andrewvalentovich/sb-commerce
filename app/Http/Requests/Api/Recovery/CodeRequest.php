<?php

namespace App\Http\Requests\Api\Recovery;

use App\Rules\LoginRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class CodeRequest extends FormRequest
{
    public function rules(): array {
        return [
            'login' => ['required', 'string', new LoginRule(), 'regex:/^\+?\d{11,15}$/', 'exists:users,phone'],
            'code' => ['required', 'integer', 'min_digits:4', 'max_digits:4'],
        ];
    }

    public function attributes() {
        return [
            'code' => 'Код',
            'phone' => 'Номер телефона',
        ];
    }

    public function messages() {
        return [
            'code.required' => 'Введите код подтврждения.',
            'code.min_digits' => 'Код должен содержать не менее :min цифр.',
            'code.max_digits' => 'Код должен содержать не более :max цифр.',
            'code.integer' => 'Код должен содержать только цифры.',
            'phone.exists' => 'Не найдено учётной записи с таким же номером телефона.',
            'phone.required' => 'Введите номер телефона.',
            'phone.regex' => 'Телефон указан не верно. Пример: +7 (999) 123-45-67.',
        ];
    }
}
