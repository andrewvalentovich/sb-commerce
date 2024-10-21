<?php

namespace App\Repositories;

use App\Http\Filters\UserFilter;
use App\Models\User as Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserRepository extends CoreRepository
{
    public function getForPage($perPage = null)
    {
        $data = $this->startConditions()
            ->where('name', '!=', '')
            ->oldest();

        return $data->paginate($this->numItemsPerPage($perPage));
    }

    public function getForAdminPage(array $filterParams = null, int|null $perPage = 20)
    {
        $filterParams['isAdmin'] = Auth::user()->hasRole('admin');

        $filter = app()->make(UserFilter::class, ['queryParams' => $filterParams]);
        $data = $this->startConditions()
            ->with('roles')
            ->filter($filter);

        return $data->paginate($this->numItemsPerPage($perPage));
    }

    public function list($column = 'name', $key = 'id')
    {
        $data = $this->startConditions()
            ->oldest('name')
            ->whereNotNull($column)
            ->pluck($column, $key);

        return $data;
    }

    protected function getModelClass(): string
    {
        return Model::class;
    }
}
