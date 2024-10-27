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
        Schema::create('product_tag', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('tag_id')->nullable()->comment('Идентификатор тэга');
            $table->foreign('tag_id')->references('id')->on('tags')->noActionOnDelete();

            $table->unsignedBigInteger('product_id')->nullable()->comment('Идентификатор продукта (позиции)');
            $table->foreign('product_id')->references('id')->on('products')->noActionOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_tag');
    }
};
