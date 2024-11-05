<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Api\TagResource;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;

class TagsController extends ApiController
{
    public function __construct()
    {
        $this->repository = TagRepository::make();
    }

    public function list()
    {
        $data = $this->repository->getList();
        return $this->sendResponse(TagResource::collection($data));
    }
}
