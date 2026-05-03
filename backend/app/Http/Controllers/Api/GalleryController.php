<?php

namespace App\Http\Controllers\Api;

use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class GalleryController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $query = GalleryImage::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->is_featured);
        }

        $images = $query->orderBy('sort_order')->latest()->get();

        return $this->sendResponse($images, 'Gallery images retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'category' => 'required|in:campus,graduation,events,labs,sports,general',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'alt_text' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['uploaded_by'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $input['image_path'] = asset('storage/' . $path);
            $input['thumbnail_path'] = asset('storage/' . $path); // Simplified for now
        }

        $image = GalleryImage::create($input);

        return $this->sendResponse($image, 'Gallery image uploaded successfully.');
    }

    public function update(Request $request, $id): JsonResponse
    {
        $image = GalleryImage::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'category' => 'in:campus,graduation,events,labs,sports,general',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $image->update($request->all());

        return $this->sendResponse($image, 'Gallery image updated successfully.');
    }

    public function destroy($id): JsonResponse
    {
        $image = GalleryImage::findOrFail($id);
        if ($image->image_path) {
            $path = str_replace(asset('storage/'), '', $image->image_path);
            Storage::disk('public')->delete($path);
        }
        $image->delete();
        return $this->sendResponse([], 'Gallery image deleted successfully.');
    }

    public function reorder(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:gallery_images,id',
            'orders.*.sort_order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        foreach ($request->orders as $order) {
            GalleryImage::where('id', $order['id'])->update(['sort_order' => $order['sort_order']]);
        }

        return $this->sendResponse([], 'Gallery order updated successfully.');
    }
}
