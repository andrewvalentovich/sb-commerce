<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Admin\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function me() {
        $user = Auth::user();
        if ($user) $user->load('roles');

        return UserResource::make($user);
    }
}
