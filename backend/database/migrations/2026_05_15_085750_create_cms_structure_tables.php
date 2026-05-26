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
        // Pages table to store main page entries
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('template')->default('default');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // Page Sections table for dynamic content blocks
        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->string('section_key'); // e.g., 'hero', 'welcome', 'stats'
            $table->string('section_name');
            $table->json('content'); // Stores images, titles, subtitles, etc.
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Faculties table
        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        // Programs table (enhanced)
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('level'); // Degree, Diploma, etc.
            $table->string('duration');
            $table->decimal('tuition_fee', 15, 2)->nullable();
            $table->text('requirements')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Admissions settings
        Schema::create('admissions_content', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // 'requirements', 'process', 'fees'
            $table->string('title');
            $table->text('content');
            $table->string('file_path')->nullable(); // For brochures/PDFs
            $table->timestamps();
        });

        // SEO Settings
        Schema::create('seo_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug')->unique();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('og_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seo_settings');
        Schema::dropIfExists('admissions_content');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('faculties');
        Schema::dropIfExists('page_sections');
        Schema::dropIfExists('pages');
    }
};
