<?php

namespace App\Models\Media\Traits;

trait HasMediaCollections
{
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::getMediaCollectionName())
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);
    }
}
