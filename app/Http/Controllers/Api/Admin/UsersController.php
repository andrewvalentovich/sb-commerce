<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\Admin\User\FilterRequest;
use App\Http\Requests\Api\Admin\User\StoreRequest;
use App\Http\Requests\Api\Admin\User\UpdateRequest;
use App\Http\Resources\Api\Admin\UserResource;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\CRUD\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends ApiController
{
    public function __construct()
    {
        $this->service = UserService::make();
        $this->repository = UserRepository::make();
    }

    public function index(Request $request)
    {
        $filterRequest = app(FilterRequest::class);
        $data = $this->repository->getForAdminPage($filterRequest->validated());
        return $this->sendResponse(UserResource::collection($data)->response()->getData(true));
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $row = $this->service->store($data);
        return $this->sendResponse(UserResource::make($row), "Пользователь $row->id успешно создан!");
    }

    public function update(UpdateRequest $request, User $user)
    {
        if ($user->hasRole('admin') && !Auth::user()->hasRole('admin')) {
            return $this->sendError('Вы не можете редактировать администратора');
        }

        $data = $request->validated();
        $row = $this->service->update($user, $data);
        return $this->sendResponse(UserResource::make($row), "Данные пользователя $user->id успешно обновлены!");
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->hasRole('admin')) {
            $request->middleware('role.check.admin');
        }

        $this->service->destroy($user);
        return $this->noContent();
    }
}
