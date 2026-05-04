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
            $table->date('late_registration_deadline')->nullable()->after('lectures_start_date');
            $table->date('mid_semester_date')->nullable()->after('late_registration_deadline');
            $table->date('final_exams_date')->nullable()->after('mid_semester_date');
            $table->date('graduation_date')->nullable()->after('final_exams_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('intakes', function (Blueprint $table) {
            $table->dropColumn([
                'late_registration_deadline',
                'mid_semester_date',
                'final_exams_date',
                'graduation_date'
            ]);
        });
    }
};
