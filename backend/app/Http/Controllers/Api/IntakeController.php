<?php

namespace App\Http\Controllers\Api;

use App\Models\Intake;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;

class IntakeController extends BaseController
{
    public function index(): JsonResponse
    {
        $intakes = Intake::latest()->get();
        return $this->sendResponse($intakes, 'Intakes retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'orientation_date' => 'nullable|date',
            'lectures_start_date' => 'nullable|date',
            'late_registration_deadline' => 'nullable|date',
            'mid_semester_date' => 'nullable|date',
            'final_exams_date' => 'nullable|date',
            'graduation_date' => 'nullable|date',
            'application_deadline' => 'required|date|before:end_date',
            'status' => 'required|in:draft,active,closed',
            'max_students' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['created_by'] = $request->user()->id;

        $intake = Intake::create($input);

        return $this->sendResponse($intake, 'Intake created successfully.');
    }

    public function show($id): JsonResponse
    {
        $intake = Intake::findOrFail($id);
        return $this->sendResponse($intake, 'Intake retrieved successfully.');
    }

    public function update(Request $request, $id): JsonResponse
    {
        $intake = Intake::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'orientation_date' => 'nullable|date',
            'lectures_start_date' => 'nullable|date',
            'late_registration_deadline' => 'nullable|date',
            'mid_semester_date' => 'nullable|date',
            'final_exams_date' => 'nullable|date',
            'graduation_date' => 'nullable|date',
            'application_deadline' => 'required|date|before:end_date',
            'status' => 'required|in:draft,active,closed',
            'max_students' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $intake->update($request->all());

        return $this->sendResponse($intake, 'Intake updated successfully.');
    }

    public function destroy($id): JsonResponse
    {
        $intake = Intake::findOrFail($id);
        $intake->delete();
        return $this->sendResponse([], 'Intake deleted successfully.');
    }

    public function activate($id): JsonResponse
    {
        // Close all other active intakes first
        Intake::where('status', 'active')->update(['status' => 'closed']);

        $intake = Intake::findOrFail($id);
        $intake->update(['status' => 'active']);

        return $this->sendResponse($intake, 'Intake activated successfully.');
    }

    public function close($id): JsonResponse
    {
        $intake = Intake::findOrFail($id);
        $intake->update(['status' => 'closed']);

        return $this->sendResponse($intake, 'Intake closed successfully.');
    }

    public function getActive(): JsonResponse
    {
        $intake = Intake::where('status', 'active')->first();
        if (!$intake) {
            return $this->sendError('No active intake found.');
        }
        return $this->sendResponse($intake, 'Active intake retrieved successfully.');
    }

    public function getPublished(): JsonResponse
    {
        $intakes = Intake::published()->latest('start_date')->get();
        return $this->sendResponse($intakes, 'Published intakes retrieved successfully.');
    }
}
