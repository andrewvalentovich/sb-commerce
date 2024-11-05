<?php

namespace App\Services\CRUD;

use App\Models\Media\Traits\ToMedia;
use App\Models\Product as Model;
use App\Services\CoreService;
use Illuminate\Support\Arr;

class ProductService extends CoreService
{
    use ToMedia;

    public function store($data): Model {
        $tagIds = Arr::pull($data, 'tag_ids');
        $media = Arr::pull($data, 'media');

        $row = $this->model->create($data);

        if ($media) {
            $this->uploadMedia($row, $media);
        }

        $row->tags()->sync($tagIds);

        return $row;
    }
    public function update(Model|int $row, $data): Model {
        $tagIds = Arr::pull($data, 'tag_ids');
        $row->tags()->sync($tagIds);

        $row->update($data);

        return $row;
    }

    public function destroy(Model|int $row) {
        /** @var Model $row */
        $row = $this->getRow($row);
        $this->deleteAllMedia($row);

        $row->tags()->detach();
        $row->delete();
    }

    protected function getModelClass(): string {
        return Model::class;
    }
}
