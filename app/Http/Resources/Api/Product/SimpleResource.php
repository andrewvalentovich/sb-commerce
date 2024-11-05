<?php

namespace App\Http\Resources\Api\Product;

use App\Http\Resources\Api\MediaResource;
use App\Http\Resources\Api\TagResource;
use \App\Http\Resources\Api\Category\SimpleResource as CategoryResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->guard('sanctum')->user();

        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'slug' => $this->slug,
            'isbn' => $this->isbn,
            'year_of_production' => $this->year_of_production,
            'package_weight' => $this->package_weight,
            'count_per_package' => $this->count_per_package,
            'price' => $this->price,
            'discount_price' => $user && $user->hasRole('client')
                ? number_format((1 - $user->discount_percentage / 100) * $this->price, 2, '.', ' ')
                : null,
            'ccfea' => $this->ccfea,
            'category_id' => $this->category_id,
        ];

        if ($this->relationLoaded('media')) {
            $data['media'] = MediaResource::collection($this->getMedia(Product::getMediaCollectionName()));
        }

        if ($this->relationLoaded('tags')) {
            $data['tags'] = TagResource::collection($this->tags);
            $data['tag_ids'] = $this->tags->pluck('id');
        }

        if ($this->relationLoaded('category')) {
            $data['category'] = CategoryResource::make($this->category);
        }

        return $data;

    }
}