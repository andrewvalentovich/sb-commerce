<?php

namespace App\Http\Resources\Api;

use App\Models\Media\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Media
 */
class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): ?array
    {
        return [
            'id' => $this->id,
            'url' => $this->getUrl(),
            'thumb_url' => $this->getUrl('thumb'),
            'mime_type' => $this->mime_type,
            'file_name' => $this->file_name,
            'order_column' => $this->order_column,
        ];
    }
}
