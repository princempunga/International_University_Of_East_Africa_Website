<?php

namespace App\Http\Controllers\Api;

use App\Models\SeoSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class SeoController extends BaseController
{
    /**
     * Display a listing of SEO settings.
     */
    public function index(): JsonResponse
    {
        $settings = SeoSetting::all();
        return $this->sendResponse($settings, 'SEO settings retrieved successfully.');
    }

    /**
     * Store or update SEO settings for a specific page.
     */
    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'page_name' => 'required|string',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'keywords' => 'nullable|string',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $setting = SeoSetting::updateOrCreate(
            ['page_name' => $request->page_name],
            $request->only(['title', 'description', 'keywords', 'og_title', 'og_description', 'og_image'])
        );

        return $this->sendResponse($setting, 'SEO settings updated successfully.');
    }

    /**
     * Get SEO settings for a specific page.
     */
    public function show($page_name): JsonResponse
    {
        $setting = SeoSetting::where('page_name', $page_name)->first();

        if (!$setting) {
            return $this->sendError('SEO settings not found for this page.');
        }

        return $this->sendResponse($setting, 'SEO settings retrieved successfully.');
    }
}
