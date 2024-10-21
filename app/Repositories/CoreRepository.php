<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

abstract class CoreRepository {
    protected Model $model;

    public function __construct() {
        $this->model = app($this->getModelClass());
    }

    abstract protected function getModelClass(): string;

    protected function startConditions(): Builder {
        return (clone $this->model)->query();
    }

    public function numItemsPerPage($perPage = null): int {
        if (is_null($perPage)) {
            $perPage = request('perPage', 15);
        }

        $perPage = intval($perPage);

        if ($perPage === -1) {
            $perPage = 10000;
        }

        return $perPage;
    }

    public function getRow($row, $columns = ['*']) {
        if (! $row instanceof Model) {
            $row = $this->model->find($row, $columns);
        }

        return $row;
    }

    public static function make(): static {
        return app(static::class);
    }
}
