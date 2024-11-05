<?php

namespace App\Http\Resources\Api\Category;

use App\Http\Resources\Api\MediaResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class ListResource extends JsonResource
{
    public function toArray($request) {
        $data = Arr::only(parent::toArray($request), [
            'id', 'name', 'slug', 'description', 'parent_id', 'sort_order', 'createdAt', 'products_count'
        ]);

        if ($this->relationLoaded('children')) {
            $data['children'] = SimpleResource::collection($this->children);
        }

        if ($this->relationLoaded('parent')) {
            $data['parent'] = SimpleResource::collection($this->parent);
        }

        if ($this->relationLoaded('media')) {
            $data['media'] = MediaResource::collection($this->getMedia(Category::getMediaCollectionName()));
        }

        return $data;
    }
}
