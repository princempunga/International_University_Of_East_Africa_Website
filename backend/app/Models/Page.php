<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['title', 'slug', 'template', 'is_published'];

    public function sections()
    {
        return $this->hasMany(PageSection::class)->orderBy('order');
    }
}
