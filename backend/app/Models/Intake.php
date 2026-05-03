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
        'application_deadline',
        'status',
        'description',
        'max_students',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
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
