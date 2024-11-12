<?php

namespace App\Services\CRUD;

use App\Http\Requests\Api\Order\StoreRequest;
use App\Models\Order as Model;
use App\Services\CoreService;

class OrderService extends CoreService
{
    public function store($request): Model
    {
        $storeRequest = app(StoreRequest::class);
        $data = $storeRequest->validated();

        // Utm
        $data['utm_data']['client_ip'] = $request->ip();

        $data['utm_data'] = json_encode($data['utm_data']);
        $data['products_data'] = json_encode($data['products_data']);

        return $this->model->create($data);
    }

    protected function getModelClass(): string {
        return Model::class;
    }
}
