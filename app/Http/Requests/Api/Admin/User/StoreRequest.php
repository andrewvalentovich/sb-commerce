<?php

namespace App\Http\Requests\Api\Admin\User;

use App\Enums\Users\StatusesEnum;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreRequest extends FormRequest
{
    public function rules(): array {
        $inStatuses = implode(',', StatusesEnum::toArray());

        return [
            'name' => 'nullable|string|max:255',
            'email' => ['required', 'string', 'email', 'unique:users'],
            'phone' => ['required', 'string', 'regex:/^\+?\d{11,15}$/', 'unique:users'],
            'avatar' => 'nullable|file|image|max:10240',
            'discount_percentage' => 'nullable|numeric|between:0.00,100.00',
            'role' => ['nullable', 'exists:roles,name'],
            'status' => ['nullable', 'in:'.$inStatuses],
            'password' => ['required', 'string', Password::min(6)->symbols()],
        ];
    }

    public function attributes() {
        return [
            'name' => 'ФИО',
            'email' => 'Email',
            'phone' => 'Телефон',
            'discount_percentage' => 'Процент скидки',
            'avatar' => 'Аватарка',
            'role' => 'Роль',
            'status' => 'Статус',
            'password' => 'Пароль',
        ];
    }

    public function messages() {
        return [
            'name.required' => 'Введите ваше ФИО',
            'name.string' => 'Поле ФИО должно быть строкой',
            'name.max' => 'Поле ФИО не должно превышать :max символов',
            'phone.unique' => 'Учётная запись с таким номером телефона уже существует.',
            'phone.required' => 'Введите номер телефона.',
            'phone.regex' => 'Телефон указан не верно. Пример: +79991234567.',
            'avatar.file' => 'Аватарка должна быть картинкой',
            'avatar.image' => 'Аватарка должна быть картинкой',
            'avatar.max' => 'Размер Аватарки не должен превышать :max килобайт',
            'role.in' => 'Такой роли не существует',
            'status.in' => 'Такого статуса не существует',
            'password.required' => 'Введите пароль.',
            'password.string' => 'Пароль должен быть строкой.',
            'password.min' => 'Минимальная длина пароля 6 символов.',
            'password.symbols' => 'Пароль должен содержать минимум один специальный символ («!», «@», «#», «$» и т.д.).',
        ];
    }

//    public function authorize(): bool {
//        return auth()->check();
//    }
}
