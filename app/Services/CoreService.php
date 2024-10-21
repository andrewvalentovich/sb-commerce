<?php

namespace App\Services;

use App\Repositories\CoreRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

abstract class CoreService {
    protected Model $model;
    protected CoreRepository $repository;

    protected Model|null $row;

    public function __construct() {
        $this->model = app($this->getModelClass());
    }

    protected function getRow(Model|int $row): Model {
        if (! $row instanceof Model) {
            $row = $this->model->find($row);
        }

        return $this->row = $row;
    }

    public static function make(): static {
        return app(static::class);
    }

    protected function uploadFile(UploadedFile $file, string $path): string {
        $url = $file->store($path, 'public');
        return "/storage/{$url}";
    }

    protected function uploadFileWithCustomName(UploadedFile $file, string $name, string $path): string {
        $url = $file->storeAs($path, $file->hashName() . '_' . $name,'public');
        return "/storage/{$url}";
    }

    protected function deleteFile(Model $row, string $name): void {
        $path = public_path($row->{$name});
        if (File::exists($path)) {
            File::delete($path);
        }
    }

    protected function deleteRelationsFile(Model $row, string $relationName, string $column): void {
        foreach ($row->{$relationName} as $photo) {
            $path = public_path($photo->{$column});
            if (File::exists($path)) {
                File::delete($path);
            }
            $photo->delete();
        }
    }

    abstract protected function getModelClass(): string;
}
