<?php

namespace App\Models;

use App\Models\Media\BaseMediaModel;
use App\Models\Media\Traits\HasMediaCollections;
use App\Models\Traits\Filterable;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends BaseMediaModel
{
    use HasFactory, HasMediaCollections, Sluggable, Filterable;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'isbn',
        'year_of_production',
        'package_weight',
        'count_per_package',
        'price',
        'ccfea',
        'category_id',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tag', 'product_id', 'tag_id');
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
                'separator' => '-',
                'onUpdate' => true
            ],
        ];
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->format('webp')
            ->nonQueued();

        $this->addMediaConversion('thumb')
            ->format('webp')
            ->performOnCollections('videos')
            ->nonQueued();
    }
}
