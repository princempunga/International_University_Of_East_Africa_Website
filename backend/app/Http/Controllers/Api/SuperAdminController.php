<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Setting;
use App\Models\Product;
use App\Models\Order;
use App\Models\Intake;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;

class SuperAdminController extends BaseController
{
    public function getAdmins(): JsonResponse
    {
        $admins = User::where('role', 'admin')->get();
        return $this->sendResponse($admins, 'Admins retrieved successfully.');
    }

    public function createAdmin(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $input = $request->all();
        $input['password'] = \Hash::make($input['password']);
        $input['role'] = 'admin';
        $input['created_by'] = $request->user()->id;

        $user = User::create($input);

        return $this->sendResponse($user, 'Admin created successfully.');
    }

    public function toggleAdminStatus($id): JsonResponse
    {
        $user = User::findOrFail($id);
        if ($user->role !== 'admin') {
            return $this->sendError('Error.', ['error' => 'Cannot toggle super admin status.'], 403);
        }

        $user->is_active = !$user->is_active;
        $user->save();

        return $this->sendResponse($user, 'Admin status updated successfully.');
    }

    public function deleteAdmin($id): JsonResponse
    {
        $user = User::findOrFail($id);
        if ($user->role !== 'admin') {
            return $this->sendError('Error.', ['error' => 'Cannot delete super admin.'], 403);
        }

        $user->delete();
        return $this->sendResponse([], 'Admin deleted successfully.');
    }

    public function getActivityLogs(): JsonResponse
    {
        $logs = ActivityLog::with('user')->latest()->paginate(20);
        return $this->sendResponse($logs->items(), 'Activity logs retrieved successfully.', [
            'total' => $logs->total(),
            'per_page' => $logs->perPage(),
            'current_page' => $logs->currentPage(),
        ]);
    }

    public function getSystemStats(): JsonResponse
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total'),
            'total_admins' => User::where('role', 'admin')->count(),
            'active_intake' => Intake::where('status', 'active')->first(),
        ];
        return $this->sendResponse($stats, 'System statistics retrieved successfully.');
    }

    public function getSettings(): JsonResponse
    {
        $settings = Setting::all();
        return $this->sendResponse($settings, 'Settings retrieved successfully.');
    }

    public function updateSettings(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required',
            'value' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $setting = Setting::updateOrCreate(
            ['key' => $request->key],
            ['value' => $request->value]
        );

        return $this->sendResponse($setting, 'Setting updated successfully.');
    }
}
