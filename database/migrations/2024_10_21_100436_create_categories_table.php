<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Kalnoy\Nestedset\NestedSet;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Название');
            $table->string('slug')->comment('Slug (отображение в url)');
            $table->text('description')->nullable()->comment('Описание');
            $table->string('image')->nullable()->comment('Url картинки');
            $table->smallInteger('sort_order')->default(0)->comment('Номер позиции категории внутри родителя');

            $table->unsignedSmallInteger('package_weight')->nullable()->comment('Вес пачки в кг');
            $table->unsignedSmallInteger('product_count_per_package')->nullable()->comment('Количество продукции в пачке');

            NestedSet::columns($table);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
