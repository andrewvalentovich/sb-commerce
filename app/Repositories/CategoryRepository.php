<?php

namespace App\Repositories;

use App\Http\Resources\API\Admin\CategoryResource;
use App\Models\Category as Model;

class CategoryRepository extends CoreRepository
{
    public function getList(array $params = []) {
        $data = $this->startConditions()
            ->with('media');

        if (!empty($params)) {
            if (isset($params['slug'])) {
                $data = $data->whereSlug($params['slug']);
            }
            if (isset($params['parent_id'])) {
                $data = $data->whereSlug($params['parent_id']);
            }
        }

        return $data->latest()->get();
    }

    public function getChildren(Model $row) {
        $data = $this->startConditions()->whereParentId($row->id)->with('children')->get();

        return $data;
    }

    public function getTree() {
        $data = $this->startConditions()
            ->with('media');

        return $data->orderBy('sort_order')->get()->toTree();
    }

    public function getForPage() {
        $data = $this->startConditions()
            ->with('media')
            ->orderBy('sort_order', 'asc');

        return $data->get();
    }

    public function getForAdminPage() {
        $data = $this->startConditions()
            ->with('media')
            ->orderBy('sort_order', 'asc');

        return $data->get();
    }

    public function categorySlugPage(array $params) {

        $category = Model::whereSlug($params['slug'])->first();

        $tree = $this->getTree();
        $data = $this->getChildren($category);
        $type = 'category';

        return [
            'type' => $type,
            'tree' => CategoryResource::collection($tree),
            'data' => $type == 'category' ? CategoryResource::collection($data) : $data,
        ];
    }

    protected function getModelClass(): string {
        return Model::class;
    }
}
