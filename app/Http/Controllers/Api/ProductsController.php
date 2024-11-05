<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Product\FilterRequest;
use App\Http\Resources\Api\Product\CartResource;
use App\Http\Resources\Api\Product\ListResource;
use App\Http\Resources\Api\Product\SimpleResource;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductsController extends ApiController
{
    public function __construct()
    {
        $this->repository = ProductRepository::make();
    }

    public function index(Request $request)
    {
        $filterRequest = app(FilterRequest::class);
        $data = $this->repository->getForPage($filterRequest->validated());
        return $this->sendResponse(ListResource::collection($data)->response()->getData(true));
    }

    public function cart(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'nullable|numeric'
        ]);

        $data = $this->repository->getForCart($validated['ids']);
        return $this->sendResponse(CartResource::collection($data));
    }

    public function show(Request $request, string|int $param)
    {
        $data = $this->repository->getSimple($param);
        return $data ? $this->sendResponse(SimpleResource::make($data)) : $this->sendError('Товар скрыт или его не существует');
    }
}
