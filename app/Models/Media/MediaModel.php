<?php

namespace App\Models\Media;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

interface MediaModel
{
    public function getFirstMediaData(?string $collectionName = null): ?Media;

    public function getMediaData(string $collectionName): mixed;

    public static function getMediaCollectionName(): string;
}
