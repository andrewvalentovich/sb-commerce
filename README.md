# :sparkles: Slovo-book :sparkles:

# Инструкция по установке и запуску проекта

## Для установки и запуска проекта необходимо выполнить следующие шаги: 

1. Клонировать репозиторий с проектом на свой локальный компьютер:

```shell
git clone https://github.com/andrewvalentovich/sb-commerce
```

2. Перейти в директорию проекта:

```shell
cd sb-commerce
```

3. Установить зависимости:

```shell
npm install
composer install
```

4. Далее настроить Laravel:

```shell
php artisan key:generate
php artisan storage:link
```

5. Подключить базу данных - указать параметры подключения к бд в файле .env и выполнить миграции:

```shell
php artisan migrate --seed
```

### Запуск сайта:
6. Frontend:

```shell
npm run dev
```
или
```shell
npm run preview
```

7. Backend:
```shell
php artisan serve
```

### Готово!
