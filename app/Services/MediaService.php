<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Media\Traits\ToMedia;
use App\Models\Media\Media as Model;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\Relation;

class MediaService
{
    use ToMedia;

    public function addMediaByModel(array $data, string $model, int $id)
    {
        /** @var Category|Product $relatedModel */
        $this->uploadMedia($this->getPropertyRelatedModel($model, $id), $data['files']);
    }

    public function remove(Model $model): void
    {
        Model::findOrFail($model->id)->delete();
    }

    public function changeOrder($items)
    {
        foreach ($items as $id => $sortOrder) {
            Model::where('id', $id)->update([
                'order_column' => $sortOrder
            ]);
        }
    }

    private function getPropertyRelatedModel(string $model, int $id): Category|Product
    {
        /** @var Category|Product $modelClass */
        $modelClass = Relation::getMorphedModel($model);

        return (new $modelClass)->find($id);
    }

    public static function make(): static {
        return app(static::class);
    }
}
