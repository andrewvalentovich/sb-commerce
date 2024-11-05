<?php

namespace App\Http\Resources\Api\Category;

use App\Http\Resources\Api\MediaResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class SimpleResource extends JsonResource
{
    public function toArray($request) {
        $data = Arr::only(parent::toArray($request), [
            'id', 'name', 'slug', 'description', 'sort_order', 'createdAt', 'package_weight', 'product_count_per_package'
        ]);

        if ($this->relationLoaded('media')) {
            $data['media'] = MediaResource::collection($this->getMedia(Category::getMediaCollectionName()));
        }

        return $data;
    }
}
