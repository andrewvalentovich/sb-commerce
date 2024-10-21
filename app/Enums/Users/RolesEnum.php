<?php


namespace App\Enums\Users;


enum RolesEnum: string
{
    case Admin = 'Админ';
    case Manager = 'Менеджер';
    case Client = 'Клиент';

    public static function toArray(): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $array[] = $case->value;
        }
        return $array;
    }
}
