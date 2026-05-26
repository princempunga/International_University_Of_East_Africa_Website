<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CMSController extends Controller
{
    public function getPages()
    {
        return response()->json(Page::with('sections')->get());
    }

    public function getPageContent($slug)
    {
        $page = Page::where('slug', $slug)->with('sections')->firstOrFail();
        return response()->json($page);
    }

    public function updateSection(Request $request, $id)
    {
        $section = PageSection::findOrFail($id);
        
        $validated = $request->validate([
            'content' => 'required|array',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        $section->update($validated);

        return response()->json([
            'message' => 'Section updated successfully',
            'section' => $section
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'folder' => 'string|nullable'
        ]);

        if ($request->hasFile('image')) {
            $folder = $request->folder ?? 'cms';
            $path = $request->file('image')->store("public/{$folder}");
            $url = Storage::url($path);

            return response()->json([
                'url' => asset($url),
                'path' => $path
            ]);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }
}
