<?php

namespace App\Http\Resources\Api\Admin;

use App\Http\Resources\Api\MediaResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class CategoryResource extends JsonResource
{
    public function toArray($request) {
        $data = Arr::only(parent::toArray($request), [
            'id', 'name', 'slug', 'description', 'parent_id', 'descendants', 'ancestors',
            'parent', 'sort_order', '_lft', '_rgt', 'createdAt', 'package_weight', 'product_count_per_package'
        ]);

        if ($this->relationLoaded('children')) {
            $data['children'] = CategoryResource::collection($this->children);
        }

        if ($this->relationLoaded('media')) {
            $data['media'] = MediaResource::collection($this->getMedia(Category::getMediaCollectionName()));
        }

        return $data;
    }
}
