<?php

namespace App\Http\Requests\Api\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    public function rules(): array {
        return [
            'current_password' => 'required|string|current_password',
            'password' => ['required', 'string', 'confirmed', Password::min(6)->symbols()],
        ];
    }

    public function attributes() {
        return [
            'current_password' => 'Текущий пароль',
            'password' => 'Новый пароль',
            'password_confirmation' => 'Повтор пароля'
        ];
    }

    public function messages() {
        return [
            'current_password.required' => 'Введите текущий пароль.',
            'current_password.current_password' => 'Текущий пароль введён не верно',
            'password.required' => 'Введите пароль.',
            'password.confirmed' => 'Подтвердите пароль.',
            'password.min' => 'Минимальная длина пароля 6 символов.',
            'password.symbols' => 'Пароль должен содержать минимум один специальный символ («!», «@», «#», «$» и т.д.).',
        ];
    }
}
