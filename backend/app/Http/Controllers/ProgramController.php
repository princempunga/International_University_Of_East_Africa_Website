<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function search(Request $request)
    {
        $query = Program::with('faculty');

        if ($request->has('faculty_id')) {
            $query->where('faculty_id', $request->faculty_id);
        }

        if ($request->has('level')) {
            $query->where('level', $request->level);
        }

        if ($request->has('q')) {
            $query->where('name', 'like', '%' . $request->q . '%');
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'name' => 'required|string|max:255',
            'level' => 'required|string',
            'duration' => 'required|string',
            'tuition_fee' => 'nullable|numeric',
            'requirements' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $program = Program::create($validated);

        return response()->json($program, 201);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);
        
        $validated = $request->validate([
            'faculty_id' => 'required|exists:faculties,id',
            'name' => 'required|string|max:255',
            'level' => 'required|string',
            'duration' => 'required|string',
            'tuition_fee' => 'nullable|numeric',
            'requirements' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        if ($program->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $program->update($validated);

        return response()->json($program);
    }

    public function destroy($id)
    {
        $program = Program::findOrFail($id);
        $program->delete();
        return response()->json(null, 204);
    }
}
