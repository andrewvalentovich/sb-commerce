<?php

namespace App\Services\CRUD;

use App\Models\Tag as Model;
use App\Services\CoreService;

class TagService extends CoreService
{
    public function store(array $data): Model
    {
        return Model::create($data);
    }

    public function update(Model|int $row, $data): Model
    {
        $row->update($data);
        return $row;
    }

    public function destroy(Model|int $row): void
    {
        /** @var Model $row */
        $row = $this->getRow($row);
        $row->products()->detach();
        $row->delete();
    }

    protected function getModelClass(): string
    {
        return Model::class;
    }
}
