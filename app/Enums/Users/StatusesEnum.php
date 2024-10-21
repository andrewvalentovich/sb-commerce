<?php


namespace App\Enums\Users;


enum StatusesEnum: int
{
    case Moderated = 1;
    case Active = 2;
    case BlackList = 3;

    public function label(): string
    {
        return match ($this) {
            self::Moderated => 'На модерации',
            self::Active => 'Активный',
            self::BlackList => 'Черный список',
        };
    }

    public function nameByValue($value): string
    {
        return match ($value) {
            self::Moderated->value => self::Moderated->name,
            self::Active->value => self::Active->name,
            self::BlackList->value => self::BlackList->name,
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function labels(): array
    {
        return array_column(self::cases(), 'label');
    }

    public static function toArray(): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $array[] = $case->value;
        }
        return $array;
    }

    public static function toNameArray(): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $array[] = $case->name;
        }
        return $array;
    }

    public static function toJson(): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $array[] = [
                'name' => $case->name,
                'value' => $case->value,
                'label' => $case->label()
            ];
        }

        return $array;
    }
}
