<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Profile\UpdatePasswordRequest;
use App\Http\Requests\Api\Profile\UpdateRequest;
use App\Services\CRUD\UserService;

class ProfileController extends ApiController
{
    protected $user;

    public function __construct()
    {
        $this->user = auth()->guard('sanctum')->user();
        $this->service = UserService::make();
    }

    public function update(UpdateRequest $request)
    {
        $this->service->update($this->user, $request->validated());
        return $this->createdOk('Данные успешно обновлены!');
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $this->service->updatePassword($this->user, $request->validated());
        return $this->createdOk('Пароль успешно обновлён!');
    }
}
