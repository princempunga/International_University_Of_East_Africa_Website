<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FacultyController extends Controller
{
    public function index()
    {
        return response()->json(Faculty::withCount('programs')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'icon' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $faculty = Faculty::create($validated);

        return response()->json($faculty, 201);
    }

    public function show($slug)
    {
        return response()->json(Faculty::where('slug', $slug)->with('programs')->firstOrFail());
    }

    public function update(Request $request, $id)
    {
        $faculty = Faculty::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'icon' => 'nullable|string',
        ]);

        if ($faculty->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $faculty->update($validated);

        return response()->json($faculty);
    }

    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->delete();
        return response()->json(null, 204);
    }
}
