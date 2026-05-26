<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SeoSetting;

class SEOSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'page_slug'        => 'home',
                'meta_title'       => 'IUEA - International University of East Africa',
                'meta_description' => 'Welcome to the International University of East Africa — NCHE accredited, offering world-class degrees, diplomas and certificates in Kampala, Uganda.',
                'meta_keywords'    => 'IUEA, International University East Africa, university Uganda, degrees Uganda, Kampala university',
                'og_title'         => 'IUEA — Empowering Africa\'s Next Generation',
                'og_description'   => 'Join 9,000+ students from 45+ countries at IUEA, Uganda\'s premier institution for quality higher education.',
                'og_image'         => '/og-home.png',
                'canonical_url'    => 'https://www.iuea.ac.ug',
            ],
            [
                'page_slug'        => 'about',
                'meta_title'       => 'About IUEA | Our Mission, Vision & History',
                'meta_description' => 'Learn about the International University of East Africa — our history since 1998, our mission to empower East Africa through quality education, and our core values.',
                'meta_keywords'    => 'about IUEA, IUEA history, IUEA mission vision, university East Africa',
                'og_title'         => 'About IUEA — Our Story Since 1998',
                'og_description'   => 'Discover IUEA\'s journey from 1998 to becoming East Africa\'s leading private university.',
                'og_image'         => '/og-about.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/about',
            ],
            [
                'page_slug'        => 'academics',
                'meta_title'       => 'Academics | Faculties & Departments | IUEA',
                'meta_description' => 'Explore IUEA\'s diverse academic offerings across multiple faculties including Science & Technology, Business, Law, Social Sciences and more.',
                'meta_keywords'    => 'IUEA faculties, IUEA academics, university programs Uganda, degrees Uganda',
                'og_title'         => 'IUEA Academics — World-Class Faculties',
                'og_description'   => 'Explore 62+ programs across IUEA\'s diverse academic faculties.',
                'og_image'         => '/og-academics.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/academics',
            ],
            [
                'page_slug'        => 'admissions',
                'meta_title'       => 'Admissions | How to Apply | IUEA',
                'meta_description' => 'Apply to IUEA — find out about entry requirements, tuition fees, scholarships, and our step-by-step application process for undergraduate and postgraduate programs.',
                'meta_keywords'    => 'IUEA admissions, apply IUEA, university admission Uganda, IUEA fees',
                'og_title'         => 'Apply to IUEA — Join Our Growing Community',
                'og_description'   => 'Start your application to IUEA today. Review requirements, fees, and intake dates.',
                'og_image'         => '/og-admissions.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/admissions',
            ],
            [
                'page_slug'        => 'news',
                'meta_title'       => 'News & Events | IUEA',
                'meta_description' => 'Stay updated with the latest news, events, announcements and research highlights from the International University of East Africa.',
                'meta_keywords'    => 'IUEA news, IUEA events, university Uganda news',
                'og_title'         => 'IUEA News & Events',
                'og_description'   => 'Latest campus news, academic events, and research highlights from IUEA.',
                'og_image'         => '/og-news.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/news',
            ],
            [
                'page_slug'        => 'gallery',
                'meta_title'       => 'Gallery | Campus Life at IUEA',
                'meta_description' => 'Browse photos from IUEA\'s beautiful campus, graduation ceremonies, student activities, sporting events and more.',
                'meta_keywords'    => 'IUEA gallery, IUEA campus photos, IUEA graduation',
                'og_title'         => 'IUEA Gallery — Campus Life in Pictures',
                'og_description'   => 'See the vibrant campus life, events and facilities at IUEA through our photo gallery.',
                'og_image'         => '/og-gallery.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/gallery',
            ],
            [
                'page_slug'        => 'contact',
                'meta_title'       => 'Contact IUEA | Get in Touch',
                'meta_description' => 'Contact the International University of East Africa. Find our address, phone numbers, email, and social media links. We\'re here to help.',
                'meta_keywords'    => 'contact IUEA, IUEA address, IUEA phone, IUEA email',
                'og_title'         => 'Contact IUEA',
                'og_description'   => 'Get in touch with IUEA admissions, administration or student services.',
                'og_image'         => '/og-contact.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/contact',
            ],
            [
                'page_slug'        => 'student-life',
                'meta_title'       => 'Student Life | Clubs, Sports & Accommodation | IUEA',
                'meta_description' => 'Discover vibrant student life at IUEA — from sports and clubs to accommodation and healthcare, experience more than just academics.',
                'meta_keywords'    => 'IUEA student life, IUEA clubs, IUEA accommodation, IUEA sports',
                'og_title'         => 'IUEA Student Life',
                'og_description'   => 'Explore clubs, sports, accommodation and more at IUEA\'s vibrant campus.',
                'og_image'         => '/og-student-life.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/student-life',
            ],
            [
                'page_slug'        => 'shop',
                'meta_title'       => 'IUEA Shop | Official University Merchandise',
                'meta_description' => 'Shop official IUEA merchandise — branded apparel, books, stationery and more. Delivered to your door.',
                'meta_keywords'    => 'IUEA shop, university merchandise Uganda, IUEA branded products',
                'og_title'         => 'IUEA Official Shop',
                'og_description'   => 'Purchase official IUEA branded merchandise and academic materials.',
                'og_image'         => '/og-shop.png',
                'canonical_url'    => 'https://www.iuea.ac.ug/shop',
            ],
        ];

        foreach ($pages as $page) {
            SeoSetting::updateOrCreate(
                ['page_slug' => $page['page_slug']],
                $page
            );
        }
    }
}
