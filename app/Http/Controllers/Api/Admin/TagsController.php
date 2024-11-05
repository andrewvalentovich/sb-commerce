<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\Admin\Tag\StoreRequest;
use App\Http\Requests\Api\Admin\Tag\UpdateRequest;
use App\Http\Resources\Api\TagResource;
use App\Models\Tag;
use App\Repositories\TagRepository;
use App\Services\CRUD\TagService;
use Illuminate\Http\Request;

class TagsController extends ApiController
{
    public function __construct()
    {
        $this->service = TagService::make();
        $this->repository = TagRepository::make();
    }

    public function index(Request $request)
    {
        $data = $this->repository->getForPage();
        return $this->sendResponse(TagResource::collection($data)->response()->getData(true));
    }

    public function list()
    {
        $data = $this->repository->getList();
        return $this->sendResponse(TagResource::collection($data));
    }

    public function store(StoreRequest $request)
    {
        $row = $this->service->store($request->validated());
        return $this->sendResponse(TagResource::make($row), "Тэг $row->id успешно создан!");
    }

    public function update(UpdateRequest $request, Tag $tag)
    {
        $row = $this->service->update($tag, $request->validated());
        return $this->sendResponse(TagResource::make($row), "Тэг $tag->id успешно обновлены!");
    }

    public function destroy(Tag $tag)
    {
        $this->service->destroy($tag);
        return $this->noContent();
    }
}
