<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Intake extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'orientation_date',
        'lectures_start_date',
        'late_registration_deadline',
        'mid_semester_date',
        'final_exams_date',
        'graduation_date',
        'application_deadline',
        'status',
        'description',
        'max_students',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'orientation_date' => 'date',
        'lectures_start_date' => 'date',
        'late_registration_deadline' => 'date',
        'mid_semester_date' => 'date',
        'final_exams_date' => 'date',
        'graduation_date' => 'date',
        'application_deadline' => 'date',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('status', 'active');
    }

    public function scopePublished(Builder $query)
    {
        return $query->where('status', '!=', 'draft');
    }
}
