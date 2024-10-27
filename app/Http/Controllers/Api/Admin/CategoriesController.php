<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\Admin\Category\SortRequest;
use App\Http\Requests\Api\Admin\Category\StoreRequest;
use App\Http\Requests\Api\Admin\Category\UpdateRequest;
use App\Http\Resources\Api\Admin\CategoryResource;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use App\Services\CRUD\CategoryService;
use Illuminate\Http\Request;

class CategoriesController extends ApiController
{
    public function __construct()
    {
        $this->service = CategoryService::make();
        $this->repository = CategoryRepository::make();
    }

    public function index(Request $request)
    {
        $data = $this->repository->getForAdminPage();

        return $this->sendResponse(CategoryResource::collection($data));
    }

    public function list(Request $request)
    {
        $data = $this->repository->getList();

        return $this->sendResponse(CategoryResource::collection($data));
    }

    public function tree(Request $request)
    {
        $data = $this->repository->getTree();

        return $this->sendResponse(CategoryResource::collection($data));
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $row = $this->service->store($data);
        return $this->sendResponse(CategoryResource::make($row), 'Категория создана!');
    }

    public function update(UpdateRequest $request, Category $category)
    {
        $data = $request->validated();
        $row = $this->service->update($category, $data);
        return $this->sendResponse(CategoryResource::make($row), 'Категория обновлена!');
    }

    public function destroy(Category $category)
    {
        $this->service->destroy($category);
        return $this->createdOk('Категория удалена!');
    }

    public function changeOrder(Request $request)
    {
        $items = $request->input('items');
        if (! is_array($items) || ! count($items = array_filter($items, 'is_numeric'))) {
            return $this->noContent();
        }
        $this->service->changeOrder($items);

        return $this->noContent();
    }

    public function sort(SortRequest $request)
    {
        $data = $request->validated();
        $this->service->sort($data['items']);

        return $this->noContent();
    }
}
