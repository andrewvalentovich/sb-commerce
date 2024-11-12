<?php

namespace App\Http\Requests\Api\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => 'nullable|string|max:255',
//            'email' => ['nullable', 'string', 'email', 'unique:users'],
//            'phone' => ['nullable', 'string', 'regex:/^\+?\d{11,15}$/', 'unique:users'],
        ];
    }

    public function attributes() {
        return [
            'name' => 'ФИО',
            'email' => 'Email',
            'phone' => 'Телефон',
        ];
    }
}
