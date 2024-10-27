<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Media\Media as Model;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\Relation;

class MediaRepository extends CoreRepository
{
    public function list(string $model, int $id)
    {
        /** @var Category|Product $relatedModel */
        $relatedModel = $this->getPropertyRelatedModel($model, $id);
        \Log::info('MediaRepository', [$relatedModel]);
        return $relatedModel->getMediaData($relatedModel::getMediaCollectionName());
    }

    private function getPropertyRelatedModel(string $model, int $id): Category|Product
    {
        /** @var Category|Product $modelClass */
        $modelClass = Relation::getMorphedModel($model);

        return (new $modelClass)->find($id);
    }

    protected function getModelClass(): string
    {
        return Model::class;
    }
}
