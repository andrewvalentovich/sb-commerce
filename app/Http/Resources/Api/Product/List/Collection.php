<?php

namespace App\Http\Resources\Api\Product\List;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class Collection extends ResourceCollection
{
    protected $discountPercentage;

    public function setDiscountPercentage($value){
        $this->discountPercentage = $value;
        return $this;
    }

    public function toArray(Request $request)
    {
        return $this->collection->map(function (Resource $resource) use ($request) {
            return $resource->setDiscountPercentage($this->discountPercentage)->toArray($request);
        })->all();
    }
}
