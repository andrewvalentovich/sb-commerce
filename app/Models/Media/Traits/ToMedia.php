<?php

namespace App\Models\Media\Traits;

use App\Models\Media\MediaModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait ToMedia
{
    /**
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function uploadMedia(
        MediaModel|Model $model,
        string|array|UploadedFile $images,
        string $collectionName = 'default',
    ) {
        $collectionName = $model::getMediaCollectionName();

        if (! empty($images)) {
            if (is_array($images)) {
                $res = [];

                foreach ($images as $image) {
                    $res[] = $this->addMediaByPreservingOriginal($model, $image, $collectionName);
                }

                return $res;
            } else {
                return $this->addMediaByPreservingOriginal($model, $images, $collectionName);
            }
        }
    }

    public function deleteMedia(MediaModel $model, int $mediaId): void
    {
        $model
            ->media()->get()
            ->each(fn (Media $media) => $media->id === $mediaId && $media->delete());
    }

    public function deleteAllMedia(MediaModel $model): void
    {
        $model
            ->media()->delete();
    }

    /**
     * @throws FileIsTooBig
     * @throws FileDoesNotExist
     */
    private function addMediaByPreservingOriginal(
        MediaModel $model,
        UploadedFile $image,
        ?string $collectionName = null,
    ) {
        $collectionName = $collectionName ?? $model::getMediaCollectionName();

        if (! app()->environment('production')) {
            return $model
                ->addMedia($image)
                ->preservingOriginal()
//                ->withCustomProperties(['category' => $category->value ?? null])
                ->toMediaCollection($collectionName);
        } else {
            return $model
                ->addMedia($image)
//                ->withCustomProperties(['category' => $category->value ?? null])
                ->toMediaCollection($collectionName);
        }
    }
}
