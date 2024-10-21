<?php

namespace App\Traits\Enums;

trait HasLabel
{
    public function label(): string|array {
        return static::getLabel($this);
    }

    public static function getLabel(self $value): string|array {
        return __($value->name);
    }
}
