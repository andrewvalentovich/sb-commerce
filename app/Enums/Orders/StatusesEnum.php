<?php


namespace App\Enums\Orders;


enum StatusesEnum: int
{
    case Received = 1;
    case Processing = 2;
    case Done = 3;

    public function label(): string
    {
        return match ($this) {
            self::Received => 'Принят',
            self::Processing => 'Обрабатывается',
            self::Done => 'Выполнен',
        };
    }

    public function nameByValue($value): string
    {
        return match ($value) {
            self::Received->value => self::Received->name,
            self::Processing->value => self::Processing->name,
            self::Done->value => self::Done->name,
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
