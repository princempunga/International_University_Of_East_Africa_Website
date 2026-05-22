<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Intake;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\News;
use App\Models\GalleryImage;
use App\Models\SeoSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Super Admin
        $superAdmin = User::create([
            'name' => 'IUEA Super Admin',
            'email' => 'superadmin@iuea.ac.ug',
            'password' => Hash::make('SuperAdmin@2026'),
            'role' => 'super_admin',
        ]);

        // 2. Admin
        $admin = User::create([
            'name' => 'IUEA Admin',
            'email' => 'admin@iuea.ac.ug',
            'password' => Hash::make('Admin@2026'),
            'role' => 'admin',
            'created_by' => $superAdmin->id,
        ]);

        // 3. Intake
        Intake::create([
            'name' => 'January 2026 Intake',
            'start_date' => '2026-01-10',
            'end_date' => '2026-05-15',
            'application_deadline' => '2025-12-30',
            'status' => 'active',
            'description' => 'Official January intake for all faculties.',
            'max_students' => 1000,
            'created_by' => $superAdmin->id,
        ]);

        // 4. Product Categories
        $cat1 = ProductCategory::create([
            'name' => 'University Merchandise',
            'slug' => 'merchandise',
            'description' => 'Official IUEA branded items.',
        ]);

        $cat2 = ProductCategory::create([
            'name' => 'Books & Materials',
            'slug' => 'books',
            'description' => 'Academic books and study materials.',
        ]);

        // 5. Sample Products
        Product::create([
            'name' => 'IUEA Branded Hoodie',
            'slug' => 'iuea-hoodie',
            'description' => 'Premium quality crimson hoodie with gold IUEA logo.',
            'price' => 75000,
            'category_id' => $cat1->id,
            'images' => ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400'],
            'stock_quantity' => 50,
            'is_featured' => true,
            'created_by' => $superAdmin->id,
        ]);

        Product::create([
            'name' => 'University Notebook',
            'slug' => 'university-notebook',
            'description' => 'Hardcover notebook with university crest.',
            'price' => 15000,
            'category_id' => $cat1->id,
            'images' => ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400'],
            'stock_quantity' => 200,
            'created_by' => $superAdmin->id,
        ]);

        Product::create([
            'name' => 'Advanced Java Programming',
            'slug' => 'advanced-java',
            'description' => 'Essential textbook for computer science students.',
            'price' => 45000,
            'category_id' => $cat2->id,
            'images' => ['https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400'],
            'stock_quantity' => 30,
            'created_by' => $superAdmin->id,
        ]);

        Product::create([
            'name' => 'IUEA Water Bottle',
            'slug' => 'iuea-bottle',
            'description' => 'Eco-friendly reusable water bottle.',
            'price' => 20000,
            'category_id' => $cat1->id,
            'images' => ['https://images.unsplash.com/photo-1602143307185-84e03f024340?auto=format&fit=crop&q=80&w=400'],
            'stock_quantity' => 100,
            'created_by' => $superAdmin->id,
        ]);

        Product::create([
            'name' => 'Canvas Tote Bag',
            'slug' => 'tote-bag',
            'description' => 'Durable canvas bag for campus use.',
            'price' => 10000,
            'category_id' => $cat1->id,
            'images' => ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400'],
            'stock_quantity' => 150,
            'created_by' => $superAdmin->id,
        ]);

        // 6. Sample News
        News::create([
            'title' => 'IUEA Wins Regional Tech Excellence Award',
            'slug' => 'iuea-wins-tech-award',
            'content' => 'IUEA has been recognized for its outstanding contribution to technological innovation in East Africa...',
            'excerpt' => 'IUEA recognized for technological innovation contribution.',
            'category' => 'achievement',
            'status' => 'published',
            'is_featured' => true,
            'published_at' => now(),
            'author_id' => $superAdmin->id,
        ]);

        News::create([
            'title' => 'Upcoming Graduation Ceremony 2026',
            'slug' => 'graduation-2026',
            'content' => 'The 12th IUEA graduation ceremony will be held on the 15th of June at the university main campus...',
            'excerpt' => 'Details about the 12th IUEA graduation ceremony.',
            'category' => 'events',
            'status' => 'published',
            'published_at' => now(),
            'author_id' => $superAdmin->id,
        ]);

        News::create([
            'title' => 'New Research Lab Commissioned',
            'slug' => 'new-research-lab',
            'content' => 'A state-of-the-art AI research lab has been commissioned to boost postgraduate studies...',
            'excerpt' => 'State-of-the-art AI research lab commissioned.',
            'category' => 'research',
            'status' => 'published',
            'published_at' => now(),
            'author_id' => $superAdmin->id,
        ]);

        // 7. Sample Gallery Images
        GalleryImage::create([
            'title' => 'Main Campus Entrance',
            'image_path' => 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
            'category' => 'campus',
            'alt_text' => 'Main entrance of IUEA campus',
            'uploaded_by' => $superAdmin->id,
        ]);

        GalleryImage::create([
            'title' => 'Graduation Highlights',
            'image_path' => 'https://images.unsplash.com/photo-1523050335456-c38a89b7848b?auto=format&fit=crop&q=80&w=800',
            'category' => 'graduation',
            'alt_text' => 'Students celebrating graduation',
            'uploaded_by' => $superAdmin->id,
        ]);

        GalleryImage::create([
            'title' => 'Robotics Lab',
            'image_path' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
            'category' => 'labs',
            'alt_text' => 'Inside the robotics lab',
            'uploaded_by' => $superAdmin->id,
        ]);
        
        GalleryImage::create([
            'title' => 'Football Team',
            'image_path' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
            'category' => 'sports',
            'alt_text' => 'IUEA football team',
            'uploaded_by' => $superAdmin->id,
        ]);
        
        GalleryImage::create([
            'title' => 'Culture Day',
            'image_path' => 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=800',
            'category' => 'events',
            'alt_text' => 'Cultural day celebrations',
            'uploaded_by' => $superAdmin->id,
        ]);
        
        GalleryImage::create([
            'title' => 'Student Lounge',
            'image_path' => 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800',
            'category' => 'campus',
            'alt_text' => 'Students in the lounge',
            'uploaded_by' => $superAdmin->id,
        ]);

        // 8. SEO Settings
        SeoSetting::create([
            'page_name' => 'home',
            'title' => 'IUEA | International University of East Africa',
            'description' => 'Learning to Succeed. NCHE Accredited institution in Kampala, Uganda offering world-class education.',
            'keywords' => 'IUEA, University, Kampala, Uganda, Education',
        ]);

        SeoSetting::create([
            'page_name' => 'about',
            'title' => 'About Us | IUEA',
            'description' => 'Discover the story, mission and vision of the International University of East Africa.',
            'keywords' => 'IUEA History, University Mission, Uganda Higher Education',
        ]);

        SeoSetting::create([
            'page_name' => 'academics',
            'title' => 'Academics & Programs | IUEA',
            'description' => 'Explore our wide range of undergraduate and postgraduate programs.',
            'keywords' => 'University Programs, Degrees, Diplomas, IUEA Academics',
        ]);
    }
}
