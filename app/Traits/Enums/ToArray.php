<?php

namespace App\Traits\Enums;

trait ToArray
{
    public static function toArray(): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $array[] = $case->value;
        }
        return $array;
    }
}
