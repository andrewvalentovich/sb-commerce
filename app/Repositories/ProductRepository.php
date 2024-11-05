<?php

namespace App\Repositories;

use App\Http\Filters\ProductFilter;
use App\Models\Product as Model;

class ProductRepository extends CoreRepository
{
    public function getForPage(array $filterParams = null)
    {
        if (!isset($filterParams['sort'])) {
            $filterParams['sort'] = 'id-desc';
        }

        $filter = app()->make(ProductFilter::class, ['queryParams' => $filterParams]);
        $query = $this->startConditions()
            ->with(['category', 'tags', 'media'])
            ->filter($filter);

        return $query->paginate($this->numItemsPerPage($filterParams['per_page'] ?? $query->count()));
    }

    public function getForCart(array|null $productIds)
    {
        return $productIds
            ? $this->startConditions()->whereIn('id', $productIds)->with(['category', 'tags', 'media'])->get()
            : []
        ;
    }

    public function getSimple(string|int $param)
    {
        return $this->startConditions()->where(is_numeric($param) ? 'id' : 'slug', $param)->with(['category', 'tags', 'media'])->first();
    }

    public function list()
    {
        $data = $this->startConditions()
            ->with(['category', 'tags'])
            ->latest()
            ->get();

        return $data;
    }

    protected function getModelClass(): string
    {
        return Model::class;
    }
}
