<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Product\FilterRequest;
use App\Http\Resources\Api\Product\Cart\Resource as CartResource;
use App\Http\Resources\Api\Product\List\Resource as ListResource;
use App\Http\Resources\Api\Product\SimpleResource;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductsController extends ApiController
{
    protected $discountPercentage;

    public function __construct()
    {
        $user = auth()->guard('sanctum')->user();
        $this->repository = ProductRepository::make();

        $this->discountPercentage =
            $user && $user->hasRole('client')
            ? $user->discount_percentage
            : 0
        ;
    }

    public function index(Request $request)
    {
        $filterRequest = app(FilterRequest::class);
        $data = $this->repository->getForPage($filterRequest->validated());
        return $this->sendResponse(
            ListResource::collection($data)
                ->setDiscountPercentage($this->discountPercentage)
                ->response()
                ->getData(true)
        );
    }

    public function cart(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'nullable|numeric'
        ]);

        $data = $this->repository->getForCart($validated['ids']);
        return $this->sendResponse(
            CartResource::collection($data)
                ->setDiscountPercentage($this->discountPercentage)
        );
    }

    public function show(Request $request, string|int $param)
    {
        $data = $this->repository->getSimple($param);
        return $data
            ? $this->sendResponse(SimpleResource::make($data)->setDiscountPercentage($this->discountPercentage))
            : $this->sendError('Товар скрыт или его не существует');
    }
}
