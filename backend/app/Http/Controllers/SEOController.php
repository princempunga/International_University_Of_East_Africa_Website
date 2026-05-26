<?php

namespace App\Http\Controllers;

use App\Models\SeoSetting;
use App\Models\Program;
use App\Models\News;
use App\Models\Faculty;
use Illuminate\Http\Request;

class SEOController extends Controller
{
    public function index()
    {
        return response()->json(SeoSetting::all());
    }

    public function show($slug)
    {
        $seo = SeoSetting::where('page_slug', $slug)->first();

        if (!$seo) {
            return response()->json([
                'page_slug' => $slug,
                'meta_title' => null,
                'meta_description' => null,
                'meta_keywords' => null,
                'og_title' => null,
                'og_description' => null,
                'og_image' => null,
                'canonical_url' => null,
            ]);
        }

        return response()->json($seo);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'page_slug'       => 'required|string|unique:seo_settings,page_slug',
            'meta_title'      => 'nullable|string|max:60',
            'meta_description'=> 'nullable|string|max:160',
            'meta_keywords'   => 'nullable|string',
            'og_title'        => 'nullable|string|max:60',
            'og_description'  => 'nullable|string|max:200',
            'og_image'        => 'nullable|string',
            'canonical_url'   => 'nullable|string',
        ]);

        return response()->json(SeoSetting::create($validated), 201);
    }

    public function update(Request $request, $id)
    {
        $seo = SeoSetting::findOrFail($id);

        $validated = $request->validate([
            'page_slug'       => 'required|string|unique:seo_settings,page_slug,' . $id,
            'meta_title'      => 'nullable|string|max:60',
            'meta_description'=> 'nullable|string|max:160',
            'meta_keywords'   => 'nullable|string',
            'og_title'        => 'nullable|string|max:60',
            'og_description'  => 'nullable|string|max:200',
            'og_image'        => 'nullable|string',
            'canonical_url'   => 'nullable|string',
        ]);

        $seo->update($validated);

        return response()->json($seo);
    }

    public function upsert(Request $request)
    {
        $validated = $request->validate([
            'page_slug'       => 'required|string',
            'meta_title'      => 'nullable|string|max:60',
            'meta_description'=> 'nullable|string|max:160',
            'meta_keywords'   => 'nullable|string',
            'og_title'        => 'nullable|string|max:60',
            'og_description'  => 'nullable|string|max:200',
            'og_image'        => 'nullable|string',
            'canonical_url'   => 'nullable|string',
        ]);

        $seo = SeoSetting::updateOrCreate(
            ['page_slug' => $validated['page_slug']],
            $validated
        );

        return response()->json($seo);
    }

    public function sitemap()
    {
        $baseUrl = 'https://www.iuea.ac.ug';

        $staticPages = [
            ['url' => '/',              'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => '/about',         'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => '/academics',     'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => '/admissions',    'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => '/news',          'priority' => '0.8', 'changefreq' => 'daily'],
            ['url' => '/gallery',       'priority' => '0.7', 'changefreq' => 'weekly'],
            ['url' => '/contact',       'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/student-life',  'priority' => '0.7', 'changefreq' => 'weekly'],
            ['url' => '/shop',          'priority' => '0.6', 'changefreq' => 'weekly'],
        ];

        $urls = array_map(fn($p) => [
            'loc'        => $baseUrl . $p['url'],
            'priority'   => $p['priority'],
            'changefreq' => $p['changefreq'],
            'lastmod'    => now()->toAtomString(),
        ], $staticPages);

        // Dynamic program pages
        try {
            $programs = Program::all(['slug', 'updated_at']);
            foreach ($programs as $program) {
                $urls[] = [
                    'loc'        => "{$baseUrl}/programs/{$program->slug}",
                    'priority'   => '0.8',
                    'changefreq' => 'monthly',
                    'lastmod'    => $program->updated_at->toAtomString(),
                ];
            }
        } catch (\Exception $e) {}

        // Dynamic faculty pages
        try {
            $faculties = Faculty::all(['slug', 'updated_at']);
            foreach ($faculties as $faculty) {
                $urls[] = [
                    'loc'        => "{$baseUrl}/academics/{$faculty->slug}",
                    'priority'   => '0.8',
                    'changefreq' => 'monthly',
                    'lastmod'    => $faculty->updated_at->toAtomString(),
                ];
            }
        } catch (\Exception $e) {}

        // Dynamic news/blog pages
        try {
            $news = News::all(['slug', 'updated_at']);
            foreach ($news as $item) {
                $urls[] = [
                    'loc'        => "{$baseUrl}/news/{$item->slug}",
                    'priority'   => '0.7',
                    'changefreq' => 'weekly',
                    'lastmod'    => $item->updated_at->toAtomString(),
                ];
            }
        } catch (\Exception $e) {}

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $url) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$url['loc']}</loc>\n";
            $xml .= "    <lastmod>{$url['lastmod']}</lastmod>\n";
            $xml .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$url['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }
        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }

    public function robots()
    {
        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /login\n";
        $content .= "\n";
        $content .= "Sitemap: https://www.iuea.ac.ug/sitemap.xml\n";

        return response($content, 200, ['Content-Type' => 'text/plain']);
    }
}
