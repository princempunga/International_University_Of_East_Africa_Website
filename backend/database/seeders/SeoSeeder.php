<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SeoSetting;

class SeoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'page_name' => 'home',
                'title' => 'IUEA | International University of East Africa',
                'description' => 'Learning to Succeed. NCHE Accredited institution in Kampala, Uganda offering world-class education.',
                'keywords' => 'IUEA, University, Kampala, Uganda, Education',
            ],
            [
                'page_name' => 'about',
                'title' => 'About Us | IUEA',
                'description' => 'Discover the story, mission and vision of the International University of East Africa.',
                'keywords' => 'IUEA History, University Mission, Uganda Higher Education',
            ],
            [
                'page_name' => 'academics',
                'title' => 'Academics & Programs | IUEA',
                'description' => 'Explore our wide range of undergraduate and postgraduate programs.',
                'keywords' => 'University Programs, Degrees, Diplomas, IUEA Academics',
            ],
            [
                'page_name' => 'contact',
                'title' => 'Contact Us | IUEA',
                'description' => 'Get in touch with the International University of East Africa.',
                'keywords' => 'Contact IUEA, University Location, Inquiries',
            ],
            [
                'page_name' => 'shop',
                'title' => 'IUEA Online Store | Merchandise & Books',
                'description' => 'Official merchandise and academic materials of the International University of East Africa.',
                'keywords' => 'University Shop, IUEA Hoodie, Academic Books',
            ],
            [
                'page_name' => 'admissions',
                'title' => 'Admissions | Apply to IUEA',
                'description' => 'Start your journey at IUEA. Information about intakes, requirements and online application.',
                'keywords' => 'Apply to University, IUEA Admissions, Uganda University Entry',
            ],
            [
                'page_name' => 'research',
                'title' => 'Research & Innovation | IUEA',
                'description' => 'Exploring technological frontiers and solving regional challenges through research.',
                'keywords' => 'University Research, Innovation Africa, IUEA Labs',
            ],
            [
                'page_name' => 'alumni',
                'title' => 'IUEA Alumni Network',
                'description' => 'Connect with our global network of graduates and stay updated with alumni events.',
                'keywords' => 'University Alumni, IUEA Graduates, Networking',
            ],
            [
                'page_name' => 'news',
                'title' => 'News & Events | IUEA',
                'description' => 'Latest updates, campus news, and upcoming events at the International University of East Africa.',
                'keywords' => 'Campus News, University Events, IUEA Updates',
            ],
            [
                'page_name' => 'gallery',
                'title' => 'Campus Gallery | IUEA',
                'description' => 'Visual tour of our state-of-the-art facilities and vibrant student life.',
                'keywords' => 'Campus Photos, University Gallery, IUEA Facilities',
            ],
        ];

        foreach ($settings as $setting) {
            SeoSetting::updateOrCreate(
                ['page_name' => $setting['page_name']],
                $setting
            );
        }
    }
}
