<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\Admin\Media\StoreRequest;
use App\Http\Resources\Api\MediaResource;
use App\Models\Media\Media;
use App\Services\MediaService;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;

class MediaController extends ApiController
{
    public function __construct() {
        $this->service = MediaService::make();
        $this->repository = MediaRepository::make();
    }

//    public function index(string $model, int $id)
//    {
//        $data = $this->repository->list($model, $id);
//        return MediaResource::collection($data);
//    }

    public function store(StoreRequest $request, string $model, int $id)
    {
        $this->service->addMediaByModel($request->validated(), $model, $id);
        return $this->createdOk('Добавлены медиафайлы!');
    }

    public function destroy(string $model, int $id, Media $media)
    {
        $this->service->remove($media);
        return $this->createdOk('Медиафайл удалён!');
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
}
