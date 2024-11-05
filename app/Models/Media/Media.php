<?php

namespace App\Models\Media;

use Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\MediaCollections\Models\Media as MediaBase;

/**
 * Class Media
 *
 * @property int $id
 * @property int $uuid
 * @property string $disk
 * @property string $file_name
 * @property string $mime_type
 * @property string $name
 * @property string $model_type
 * @property int $model_id
 * @property string $collection_name
 * @property string|null $conversions_disk
 * @property int $size
 * @property array $manipulations
 * @property array $custom_properties
 * @property array $responsive_images
 * @property int|null $order_column
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read string $extension
 * @property-read string $human_readable_size
 * @property-read string $type
 * @property-read Model|Eloquent $model
 */
class Media extends MediaBase
{
    use HasFactory;

    protected $fillable = [
        'order_column',
    ];

    protected $guarded = [];

    protected $appends = ['original_url', 'preview_url'];

    protected $casts = [
        'manipulations' => 'array',
        'custom_properties' => 'array',
        'generated_conversions' => 'array',
        'responsive_images' => 'array',
    ];

    public static function findByUuid(string $uuid): ?Model
    {
        $result = static::where('uuid', $uuid)->first();

        if (is_null($result)) {
            abort(404);
        }

        return $result;
    }

    public function getFullUrl(string $conversionName = ''): string
    {
        return url($this->getUrl($conversionName));
    }
}
