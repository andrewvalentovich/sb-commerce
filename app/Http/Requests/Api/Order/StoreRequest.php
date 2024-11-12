<?php

namespace App\Http\Requests\Api\Order;

use App\Enums\Orders\StatusesEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $inStatuses = implode(',', StatusesEnum::toArray());

        return [
            'name' => 'nullable|string|max:255',
            'email' => 'required_without:phone|nullable|string|email',
            'phone' => 'required_without:email|nullable|string|regex:/^\+?\d{11,15}$/',
            'user_id' => 'nullable|numeric|exists:users,id',
            'common_weight' => 'nullable|numeric|between:0,99999999.99', // 10 2
            'sum' => 'nullable|numeric|between:0,9999999999999.99', // 15 2
            'utm_data' => 'nullable|array',
            'products_data' => 'nullable|array',
            'message' => 'nullable|string|max:65535',
            'status' => "nullable|in:$inStatuses",
        ];
    }
}
