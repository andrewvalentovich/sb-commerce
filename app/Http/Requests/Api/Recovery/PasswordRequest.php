<?php

namespace App\Http\Requests\Api\Recovery;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PasswordRequest extends FormRequest
{
    public function rules(): array {
        return [
            'password' => ['required', 'string', 'confirmed', Password::min(6)->symbols()],
        ];
    }

    public function attributes() {
        return [
            'password' => 'Новый пароль',
            'password_confirmation' => 'Подтверждение пароля'
        ];
    }

    public function messages() {
        return [
            'password.required' => 'Введите пароль.',
            'password.confirmed' => 'Подтвердите пароль.',
            'password.min' => 'Минимальная длина пароля 6 символов.',
            'password.symbols' => 'Пароль должен содержать минимум один специальный символ («!», «@», «#», «$» и т.д.).',
        ];
    }
}
