<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\Admin\Product\FilterRequest;
use App\Http\Requests\Api\Admin\Product\StoreRequest;
use App\Http\Requests\Api\Admin\Product\UpdateRequest;
use App\Http\Resources\Api\Admin\ProductResource;
use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\CRUD\ProductService;
use Illuminate\Http\Request;

class ProductsController extends ApiController
{
    public function __construct()
    {
        $this->service = ProductService::make();
        $this->repository = ProductRepository::make();
    }

    public function index(Request $request)
    {
        $filterRequest = app(FilterRequest::class);
        $data = $this->repository->getForPage($filterRequest->validated());
        return $this->sendResponse(ProductResource::collection($data)->response()->getData(true));
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $row = $this->service->store($data);
        return $this->sendResponse(ProductResource::make($row), "Товар $row->id успешно создан!");
    }

    public function update(UpdateRequest $request, Product $product)
    {
        $data = $request->validated();
        $row = $this->service->update($product, $data);
        return $this->sendResponse(ProductResource::make($row), "Товар $product->id успешно обновлён!");
    }

    public function destroy(Request $request, Product $product)
    {
        $this->service->destroy($product);
        return $this->noContent();
    }
}
