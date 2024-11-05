<?php

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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Название позиции (продукта)');
            $table->text('description')->nullable()->comment('Описание позиции (продукта)');
            $table->string('slug')->comment('Slug (отображение в Url)');
            $table->string('isbn')->nullable()->comment('Код ISBN позиции (продукта)');
            $table->unsignedSmallInteger('year_of_production')->nullable()->comment('Год издания');
            $table->decimal('package_weight')->nullable()->comment('Вес пачки в кг, по стандарту наследуется от категории');
            $table->unsignedSmallInteger('count_per_package')->nullable()->comment('Количество продукции в пачке, по стандарту наследуется от категории');
            $table->unsignedMediumInteger('price')->comment('Цена');
            $table->unsignedBigInteger('ccfea')->nullable()->comment('Код ТН ВЭД');

            $table->unsignedBigInteger('category_id')->nullable()->comment('Идентификатор категории');
            $table->foreign('category_id')->references('id')->on('categories')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
