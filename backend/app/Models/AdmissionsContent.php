<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmissionsContent extends Model
{
    protected $fillable = ['category', 'title', 'content', 'file_path'];
}
