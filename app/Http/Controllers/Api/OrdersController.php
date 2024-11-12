<?php

namespace App\Http\Controllers\Api;

use App\Services\CRUD\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrdersController extends ApiController
{
    protected $service;

    public function __construct(OrderService $service)
    {
        $this->service = $service;
    }

    public function store(Request $request): JsonResponse
    {
        $this->service->store($request);
        return $this->createdOk('Заявка успешно отправлена!');
    }
}
