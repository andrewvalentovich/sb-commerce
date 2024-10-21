<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class MeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $result = Arr::only($data, [
            'id', 'name', 'avatar_url', 'access_at', 'accessAtFormat', 'email', 'phone', 'password', 'email_verified_at', 'role', 'roles',
        ]);

        return $result;
    }
}
