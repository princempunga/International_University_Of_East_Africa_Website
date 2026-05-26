<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use App\Models\Faculty;
use App\Models\Program;
use App\Models\SeoSetting;
use Illuminate\Database\Seeder;

class CMSSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Home Page
        $home = Page::updateOrCreate(
            ['slug' => 'home'],
            ['title' => 'Home Page', 'template' => 'home']
        );
        
        PageSection::updateOrCreate(
            ['page_id' => $home->id, 'section_key' => 'hero'],
            [
                'section_name' => 'Hero Section',
                'content' => [
                    'title_main' => 'Learning to',
                    'title_accent' => 'Succeed',
                    'subtitle' => "Shaping Africa's future through world-class education, cutting-edge research, and transformative experiences since 1998.",
                    'image' => '/hero.png',
                    'button_text' => 'Apply Now',
                    'button_link' => 'https://Applicants.iuea.ac.ug'
                ],
                'order' => 1
            ]
        );

        PageSection::updateOrCreate(
            ['page_id' => $home->id, 'section_key' => 'stats'],
            [
                'section_name' => 'Statistics',
                'content' => [
                    ['label' => 'Students', 'value' => '5,000+'],
                    ['label' => 'Programs', 'value' => '50+'],
                    ['label' => 'Nationalities', 'value' => '30+'],
                    ['label' => 'Alumni', 'value' => '10,000+']
                ],
                'order' => 2
            ]
        );

        // 2. About Page
        $about = Page::updateOrCreate(
            ['slug' => 'about'],
            ['title' => 'About Us', 'template' => 'about']
        );
        
        PageSection::updateOrCreate(
            ['page_id' => $about->id, 'section_key' => 'mission_vision'],
            [
                'section_name' => 'Mission & Vision',
                'content' => [
                    'mission' => 'To provide high quality education, research and innovation that meets the needs of a changing global market.',
                    'vision' => 'To be the leading technological university in East Africa.',
                    'values' => ['Innovation', 'Excellence', 'Integrity', 'Diversity']
                ],
                'order' => 1
            ]
        );

        // 3. SEO Settings
        SeoSetting::updateOrCreate(
            ['page_slug' => 'home'],
            [
                'meta_title' => 'IUEA - International University of East Africa',
                'meta_description' => 'Welcome to IUEA, the leading technological university in East Africa.',
                'meta_keywords' => 'university, east africa, uganda, education, technology'
            ]
        );

        // 4. Sample Faculty
        $science = Faculty::updateOrCreate(
            ['slug' => 'science-technology'],
            [
                'name' => 'Faculty of Science and Technology',
                'description' => 'The leading faculty for innovation and technical excellence.',
                'banner_image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
            ]
        );

        Program::updateOrCreate(
            ['slug' => 'bsc-computer-science'],
            [
                'faculty_id' => $science->id,
                'name' => 'BSc. Computer Science',
                'level' => 'Degree',
                'duration' => '3 Years',
                'tuition_fee' => 2500000,
                'description' => 'A comprehensive program covering software development, AI, and networking.'
            ]
        );
    }
}
