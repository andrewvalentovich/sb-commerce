<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Api\Category\ListResource;
use App\Http\Resources\Api\Category\TreeResource;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;

class CategoriesController extends ApiController
{
    public function __construct()
    {
        $this->repository = CategoryRepository::make();
    }

    public function list(Request $request)
    {
        $data = $this->repository->getHasProductsList();
        return $this->sendResponse(ListResource::collection($data));
    }

    public function tree(Request $request)
    {
        $data = $this->repository->getTree();
        return $this->sendResponse(TreeResource::collection($data));
    }
}
