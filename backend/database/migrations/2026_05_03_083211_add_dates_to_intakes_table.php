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
        Schema::table('intakes', function (Blueprint $table) {
            $table->date('orientation_date')->nullable()->after('end_date');
            $table->date('lectures_start_date')->nullable()->after('orientation_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('intakes', function (Blueprint $table) {
            $table->dropColumn(['orientation_date', 'lectures_start_date']);
        });
    }
};
