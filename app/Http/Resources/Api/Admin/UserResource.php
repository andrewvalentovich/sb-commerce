<?php

namespace App\Http\Resources\Api\Admin;

use App\Enums\Users\StatusesEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class UserResource extends JsonResource
{
    public function toArray(Request $request) {
        $data = parent::toArray($request);

        $result = Arr::only($data, [
            'id', 'name', 'avatar_url', 'phone', 'email', 'roles', 'role', 'created_at',
            'discount_percentage', 'status', 'phone_verified_at'
        ]);

        return [
            ...$result,
            'role' => isset($data['roles']) ? implode(',', array_column($data['roles'], 'display_name')) : null,
            'status_label' => constant('App\Enums\Users\StatusesEnum::' . $this->status->name)->label(),
        ];
    }
}
