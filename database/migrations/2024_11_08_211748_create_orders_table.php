<?php

use App\Enums\Orders\StatusesEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable()->comment('Имя пользователя');
            $table->string('phone')->nullable()->comment('Номер телефона пользователя');
            $table->string('email')->nullable()->comment('Email пользователя');

            $table->unsignedBigInteger('user_id')->nullable()->comment('Идентификатор пользователя');
            $table->foreign('user_id')->references('id')->on('users')->noActionOnDelete();

            $table->decimal('common_weight', 10)->nullable()->comment('Вес заказа в кг');
            $table->decimal('sum', 15)->comment('Стоимость заказа');

            $table->jsonb('utm_data')->nullable()->comment('Информация о utm-метках или utm-данные');
            $table->jsonb('products_data')->nullable()->comment('Подробная информация о заказанных товарах');

            $table->text('message')->nullable()->comment('Сообщение пользователя');
            $table->smallInteger('status')->default(StatusesEnum::Received->value)->comment('Статус заказа');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
