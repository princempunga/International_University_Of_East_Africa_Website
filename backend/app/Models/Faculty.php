<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'banner_image', 'icon'];

    public function programs()
    {
        return $this->hasMany(Program::class);
    }
}
