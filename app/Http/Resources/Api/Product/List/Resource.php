<?php

namespace App\Http\Resources\Api\Product\List;

use App\Http\Resources\Api\Category\SimpleResource as CategoryResource;
use App\Http\Resources\Api\MediaResource;
use App\Http\Resources\Api\TagResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Resource extends JsonResource
{
    protected $discountPercentage;

    public function setDiscountPercentage($value){
        $this->discountPercentage = $value;
        return $this;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'isbn' => $this->isbn,
            'year_of_production' => $this->year_of_production,
            'package_weight' => $this->package_weight,
            'count_per_package' => $this->count_per_package,
            'price' => number_format((1 - $this->discountPercentage / 100) * $this->price, 2, '.', ' '),
            'old_price' => number_format($this->price, 2, '.', ' '),
            'category_id' => $this->category_id,
        ];

        if ($this->relationLoaded('media')) {
            $data['media'] = MediaResource::make($this->getFirstMediaData(Product::getMediaCollectionName()));
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

    public static function collection($resource)
    {
        return new Collection($resource);
    }
}
