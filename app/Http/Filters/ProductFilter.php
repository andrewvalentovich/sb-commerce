<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class ProductFilter extends AbstractFilter
{
    // Имена переменных присваиваем константам
    const SEARCH = 'search';
    const SORT = 'sort';
    const CATEGORIES = 'categories';
    const TAGS = 'tags';

    protected function getCallbacks(): array
    {
        // Прописываем переменные ($this) и методы в 'метод'
        return [
            self::SEARCH => [$this, 'search'],
            self::SORT => [$this, 'sort'],
            self::CATEGORIES => [$this, 'categories'],
            self::TAGS => [$this, 'tags'],
        ];
    }

    protected function search(Builder $builder, $value)
    {
        $builder->where(function(Builder $builder) use ($value) {
            $builder->where('name', 'like', "%$value%")
                ->orWhere('isbn', 'like', "%$value%");
        });
    }

    protected function categories(Builder $builder, $value)
    {
        $builder->whereHas('category', function ($q) use ($value) {
            $q->whereIn('slug', is_array($value) ? $value : [$value]);
        });
    }

    protected function tags(Builder $builder, $value)
    {
        $builder->whereHas('tags', function ($q) use ($value) {
            $q->whereIn('slug', is_array($value) ? $value : [$value]);
        });
    }

    protected function sort(Builder $builder, $value)
    {
        if ($value) {
            $value_array = explode('-', $value);
            $builder->orderBy($value_array[0], $value_array[1]);
        }
    }
}
