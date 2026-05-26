<?php

namespace App\Http\Controllers;

use App\Models\AdmissionsContent;
use Illuminate\Http\Request;

class AdmissionsController extends Controller
{
    public function index()
    {
        return response()->json(AdmissionsContent::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'file_path' => 'nullable|string',
        ]);

        $content = AdmissionsContent::create($validated);

        return response()->json($content, 201);
    }

    public function update(Request $request, $id)
    {
        $content = AdmissionsContent::findOrFail($id);
        
        $validated = $request->validate([
            'category' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'file_path' => 'nullable|string',
        ]);

        $content->update($validated);

        return response()->json($content);
    }

    public function destroy($id)
    {
        $content = AdmissionsContent::findOrFail($id);
        $content->delete();
        return response()->json(null, 204);
    }
}
