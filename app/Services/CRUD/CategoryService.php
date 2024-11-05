<?php

namespace App\Services\CRUD;

use App\Models\Category;
use App\Models\Category as Model;
use App\Models\Media\Traits\ToMedia;
use App\Services\CoreService;
use Illuminate\Support\Arr;

class CategoryService extends CoreService
{
    use ToMedia;

    public function store(array $data): Model
    {
        $last_order = Model::select('sort_order')->where('parent_id', $data['parent_id'] ?? null)->orderBy('sort_order', 'desc')->first();
        $data['sort_order'] = $last_order ? $last_order->sort_order + 1 : 0;

        $row = Model::create($data);

        $media = Arr::pull($data, 'media');
        if ($media) {
            $this->uploadMedia($row, $media);
        }

        return $row;
    }

    public function update(Model|int $row, $data): Model
    {
        $row->update($data);
        return $row;
    }

    public function destroy(Model|int $row)
    {
        /** @var Model $row */
        $row = $this->getRow($row);
        $this->deleteAllMedia($row);

        $row->delete();

        Model::fixTree();
    }

    public function changeOrder($items)
    {
        foreach ($items as $id => $sortOrder) {
            Model::where('id', $id)->update([
                'sort_order' => $sortOrder
            ]);
        }
    }

    public function sort($items)
    {
        foreach ($items as $item) {
            Model::where('id', $item['id'])->update(Arr::except($item, 'id'));
        }
    }

    protected function getModelClass(): string
    {
        return Model::class;
    }
}
