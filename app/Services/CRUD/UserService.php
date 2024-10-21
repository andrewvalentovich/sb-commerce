<?php

namespace App\Services\CRUD;

use App\Enums\Users\StatusesEnum;
use App\Models\User as Model;
use App\Services\CoreService;
use Illuminate\Support\Arr;

class UserService extends CoreService
{
    public function store($data): Model {
        /** @var Model $row */
//        $avatar = Arr::pull($data, 'avatar');
        $role = Arr::pull($data, 'role');
        $status = Arr::pull($data, 'status');

        $data['status'] = $status ?? StatusesEnum::Active->value;
        $row = $this->model->create($data);

        if ($role) {
            $row->addRole($role);
        } else {
            $row->addRole('client');
        }

        return $row;
    }
    public function update(Model|int $row, $data): Model {
        /** @var Model $row */
        $row = $this->getRow($row);

        $role = Arr::pull($data, 'role');

        if ($data['email']) {
            if ($data['email'] !== $row->email) $data['email_verified_at'] = null;
        }

        $row->update($data);

        if ($role) {
            $row->removeRoles();
            $row->addRole($role);
        }

        return $row;
    }

    public function destroy(Model|int $row) {
        /** @var Model $row */
        $row = $this->getRow($row);
        $row->delete();
    }

    protected function getModelClass(): string {
        return Model::class;
    }
}
