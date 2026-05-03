<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class NewsController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $query = News::with('author');

        // If not admin, only show published news
        if (!$request->user() || !$request->user()->isAdmin()) {
            $query->published();
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->is_featured);
        }

        $news = $query->latest()->paginate(10);

        return $this->sendResponse($news->items(), 'News retrieved successfully.', [
            'total' => $news->total(),
            'per_page' => $news->perPage(),
            'current_page' => $news->currentPage(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'excerpt' => 'required',
            'category' => 'required|in:news,events,research,campus,achievement',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['slug'] = Str::slug($request->title) . '-' . uniqid();
        $input['author_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $input['featured_image'] = asset('storage/' . $path);
        }

        $news = News::create($input);

        return $this->sendResponse($news, 'News created successfully.');
    }

    public function show($slug): JsonResponse
    {
        $news = News::with('author')
            ->where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();
            
        $news->increment('view_count');
            
        return $this->sendResponse($news, 'News retrieved successfully.');
    }

    public function update(Request $request, $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'category' => 'in:news,events,research,campus,achievement',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        if ($request->hasFile('image')) {
            // Delete old image
            if ($news->featured_image) {
                $oldPath = str_replace(asset('storage/'), '', $news->featured_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('news', 'public');
            $input['featured_image'] = asset('storage/' . $path);
        }

        $news->update($input);

        return $this->sendResponse($news, 'News updated successfully.');
    }

    public function destroy($id): JsonResponse
    {
        $news = News::findOrFail($id);
        if ($news->featured_image) {
            $path = str_replace(asset('storage/'), '', $news->featured_image);
            Storage::disk('public')->delete($path);
        }
        $news->delete();
        return $this->sendResponse([], 'News deleted successfully.');
    }

    public function publish($id): JsonResponse
    {
        $news = News::findOrFail($id);
        $news->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return $this->sendResponse($news, 'News published successfully.');
    }

    public function unpublish($id): JsonResponse
    {
        $news = News::findOrFail($id);
        $news->update([
            'status' => 'draft',
            'published_at' => null,
        ]);

        return $this->sendResponse($news, 'News unpublished successfully.');
    }

    public function getLatest(): JsonResponse
    {
        $news = News::published()->latest()->take(4)->get();
        return $this->sendResponse($news, 'Latest news retrieved successfully.');
    }
}
