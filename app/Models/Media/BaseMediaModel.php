<?php

namespace App\Models\Media;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\MediaCollection;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

abstract class BaseMediaModel extends Model implements HasMedia, MediaModel
{
    use InteractsWithMedia;

    public static function getMediaCollectionName(): string
    {
        $prefix = app()->environment('testing') ? 'test_' : '';

        return $prefix.class_basename(static::class);
    }

    final public function getFirstMediaData(?string $collectionName = null): ?Media
    {
        // Get the first media from the specified collection.
        /** @var Media $media */
        $media = $this->getFirstMedia($collectionName ?? static::getMediaCollectionName());

        return $media;
    }

    final public function getMediaData(?string $collectionName): ?MediaCollection
    {
        return $this->getMediaCollection($collectionName ?? static::getMediaCollectionName());
    }
}
