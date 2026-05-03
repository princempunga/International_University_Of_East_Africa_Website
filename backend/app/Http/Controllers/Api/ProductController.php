<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->is_featured);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->latest()->paginate(12);

        return $this->sendResponse($products->items(), 'Products retrieved successfully.', [
            'total' => $products->total(),
            'per_page' => $products->perPage(),
            'current_page' => $products->currentPage(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:product_categories,id',
            'stock_quantity' => 'required|integer',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->except('images');
        $input['slug'] = Str::slug($request->name) . '-' . uniqid();
        $input['created_by'] = $request->user()->id;

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = asset('storage/' . $path);
            }
        }
        $input['images'] = $imagePaths;

        $product = Product::create($input);

        return $this->sendResponse($product, 'Product created successfully.');
    }

    public function show($slug): JsonResponse
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();
            
        return $this->sendResponse($product, 'Product retrieved successfully.');
    }

    public function update(Request $request, $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'numeric',
            'category_id' => 'exists:product_categories,id',
            'stock_quantity' => 'integer',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $product->update($request->all());

        return $this->sendResponse($product, 'Product updated successfully.');
    }

    public function destroy($id): JsonResponse
    {
        $product = Product::findOrFail($id);
        // Delete images from storage
        foreach ($product->images as $imageUrl) {
            $path = str_replace(asset('storage/'), '', $imageUrl);
            Storage::disk('public')->delete($path);
        }
        $product->delete();
        return $this->sendResponse([], 'Product deleted successfully.');
    }

    public function toggleStatus($id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $statuses = ['active', 'inactive', 'out_of_stock'];
        $currentIndex = array_search($product->status, $statuses);
        $nextIndex = ($currentIndex + 1) % count($statuses);
        $product->status = $statuses[$nextIndex];
        $product->save();

        return $this->sendResponse($product, 'Product status updated to ' . $product->status);
    }

    public function uploadImage(Request $request, $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $path = $request->file('image')->store('products', 'public');
        $images = $product->images;
        $images[] = asset('storage/' . $path);
        $product->update(['images' => $images]);

        return $this->sendResponse($product, 'Image uploaded successfully.');
    }
}
