<?php

namespace App\Http\Requests\Api\Register;

use App\Enums\Chat\CityEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class CodeRequest extends FormRequest
{
    public function rules(): array {
        return [
            'phone' => ['required', 'string', 'regex:/^\+?\d{11,15}$/', 'unique:users'],
            'code' => ['required', 'integer', 'min_digits:4', 'max_digits:4'],
            'city' => ['required', new Enum(CityEnum::class)],
            'password' => ['required', 'string', Password::min(6)->symbols()],
        ];
    }

    public function attributes() {
        return [
            'code' => 'Код',
            'phone' => 'Номер телефона',
            'password' => 'Пароль',
            'city' => 'Город пользователя',
        ];
    }

    public function messages() {
        return [
            'code.required' => 'Введите код подтврждения.',
            'code.min_digits' => 'Код должен содержать не менее :min цифр.',
            'code.max_digits' => 'Код должен содержать не более :max цифр.',
            'code.integer' => 'Код должен содержать только цифры.',
            'phone.unique' => 'Учётная запись с таким номером телефона уже существует.',
            'phone.required' => 'Введите номер телефона.',
            'phone.regex' => 'Телефон указан не верно. Пример: +7 (999) 123-45-67.',
            'password.required' => 'Введите пароль.',
            'password.min' => 'Минимальная длина пароля 6 символов.',
            'password.symbols' => 'Пароль должен содержать минимум один специальный символ («!», «@», «#», «$» и т.д.).',
        ];
    }
}
