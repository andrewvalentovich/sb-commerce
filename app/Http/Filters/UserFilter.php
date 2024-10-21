<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class UserFilter extends AbstractFilter
{
    // Имена переменных присваиваем константам
    const SEARCH = 'search';
    const SORT = 'sort';
    const ROLES = 'roles';
    const STATUSES = 'statuses';
    const ISADMIN = 'isAdmin';

    protected function getCallbacks(): array
    {
        // Прописываем переменные ($this) и методы в 'метод'
        return [
            self::SEARCH => [$this, 'search'],
            self::SORT => [$this, 'sort'],
            self::ROLES => [$this, 'roles'],
            self::STATUSES => [$this, 'statuses'],
            self::ISADMIN => [$this, 'isAdmin'],
        ];
    }

    protected function search(Builder $builder, $value)
    {
        if(isset($value)) {
            $builder->where(function(Builder $builder) use ($value) {
                $builder->where('name', 'like', "%$value%")
                    ->orWhere('phone', 'like', "%$value%")
                    ->orWhere('email', 'like', "%$value%");
            });
        }
    }

    protected function roles(Builder $builder, $value)
    {
        $builder->whereHas('roles', function ($q) use ($value) {
            $q->whereIn('name', is_array($value) ? $value : [$value]);
        });
    }

    protected function isAdmin(Builder $builder, $value)
    {
        if (! $value) {
            $builder->whereHas('roles', function ($q) use ($value) {
                $q->where('name', '!=', 'admin');
            });
        }
    }

    protected function statuses(Builder $builder, $value)
    {
        if(isset($value)) {
            $statuses =
                is_array($value)
                ? Arr::map($value, function (string $el, int $key) {
                    return constant('App\Enums\Users\StatusesEnum::' . $el)->value;
                })
                : [constant('App\Enums\Users\StatusesEnum::' . $value)->value]
            ;

            $builder->whereIn('status', $statuses);
        }
    }

    protected function sort(Builder $builder, $value)
    {
        if ($value) {
            $value_array = explode('-', $value);
            $builder->orderBy($value_array[0], $value_array[1]);
        }
    }
}
