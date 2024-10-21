<?php

namespace App\Http\Controllers\Api;


use App\Enums\Users\StatusesEnum;
use App\Http\Resources\Api\RoleResource;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class EnumController extends ApiController
{
    public function userRoles()
    {
        $roles = Auth::user()->hasRole('admin') ? Role::all() : Role::where('name', '!=', 'admin')->get();

        return $this->sendResponse(RoleResource::collection($roles));
    }

    public function userStatuses () {
        return $this->sendResponse(StatusesEnum::toJson());
    }
}
