<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CategoryController extends BaseController
{
    public function index(): JsonResponse
    {
        $categories = ProductCategory::withCount('products')->get();
        return $this->sendResponse($categories, 'Categories retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:product_categories,name',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $input['image_path'] = asset('storage/' . $path);
        }

        $category = ProductCategory::create($input);

        return $this->sendResponse($category, 'Category created successfully.');
    }

    public function update(Request $request, $id): JsonResponse
    {
        $category = ProductCategory::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:product_categories,name,' . $id,
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $input['image_path'] = asset('storage/' . $path);
        }

        $category->update($input);

        return $this->sendResponse($category, 'Category updated successfully.');
    }

    public function destroy($id): JsonResponse
    {
        $category = ProductCategory::findOrFail($id);
        if ($category->products()->count() > 0) {
            return $this->sendError('Error.', ['error' => 'Cannot delete category with products.'], 400);
        }
        $category->delete();
        return $this->sendResponse([], 'Category deleted successfully.');
    }
}
