<?php

namespace App\Traits\Enums;

trait ToJson
{
    public static function toJson(bool $withLabel = false): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $prop = [
                'name' => $case->name,
                'value' => $case->value,
            ];
            if ($withLabel) {
                $prop['label'] = $case->label();
            }

            $array[] = $prop;
        }

        return $array;
    }
}
