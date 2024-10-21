<?php

namespace App\Http\Requests\Api\Register;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class StoreRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'phone' => ['required', 'string', 'regex:/^\+?\d{11,15}$/', 'unique:users,phone'],
            'password' => ['required', 'confirmed', 'string', Password::min(6)->symbols()],
        ];
    }

    public function attributes() {
        return [
            'name' => 'ФИО',
            'phone' => 'Номер телефона',
            'email' => 'Email',
            'password' => 'Пароль',
        ];
    }

    public function messages() {
        return [
            'name.max' => 'Имя не должно содержать больше :value символов.',
            'email.unique' => 'Учётная запись с таким email уже существует.',
            'email.required' => 'Введите email.',
            'email.email' => 'Email указан не верно. Пример: info@company.com.',
            'phone.unique' => 'Учётная запись с таким номером телефона уже существует.',
            'phone.required' => 'Введите номер телефона.',
            'phone.regex' => 'Телефон указан не верно. Пример: +79998887766.',
            'password.required' => 'Введите пароль.',
            'password.min' => 'Минимальная длина пароля 6 символов.',
            'password.confirmed' => 'Повторите пароль в соответствующем поле.',
            'password.symbols' => 'Пароль должен содержать минимум один специальный символ («!», «@», «#», «$» и т.д.).',
        ];
    }
}
