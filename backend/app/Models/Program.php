<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'faculty_id', 'name', 'slug', 'level', 'duration', 
        'tuition_fee', 'requirements', 'description', 'image', 'is_active'
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
}
