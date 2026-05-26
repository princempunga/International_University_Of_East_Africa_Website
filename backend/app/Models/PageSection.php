<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    protected $fillable = ['page_id', 'section_key', 'section_name', 'content', 'order', 'is_active'];

    protected $casts = [
        'content' => 'array',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
