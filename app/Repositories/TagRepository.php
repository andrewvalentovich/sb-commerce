<?php

namespace App\Repositories;

use App\Models\Tag as Model;

class TagRepository extends CoreRepository
{
    public function getForPage(int|null $perPage = 20)
    {
        return $this->startConditions()->paginate($this->numItemsPerPage($perPage));
    }

    public function getList() {
        return $this->startConditions()->latest()->get();
    }

    protected function getModelClass(): string {
        return Model::class;
    }
}
