<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Http\JsonResponse;

class AuthController extends BaseController
{
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            
            if (!$user->is_active) {
                Auth::logout();
                return $this->sendError('Unauthorized.', ['error' => 'Your account is deactivated.'], 403);
            }

            $success['token'] =  $user->createToken('IUEA_API')->plainTextToken;
            $success['user'] =  $user;

            $user->update(['last_login_at' => now()]);

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorized.', ['error' => 'Invalid email or password.'], 401);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return $this->sendResponse([], 'User logged out successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        return $this->sendResponse($request->user(), 'User profile retrieved successfully.');
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $user = $request->user();

        if (!\Hash::check($request->old_password, $user->password)) {
            return $this->sendError('Unauthorized.', ['error' => 'Current password does not match.'], 401);
        }

        $user->update(['password' => \Hash::make($request->password)]);

        return $this->sendResponse([], 'Password changed successfully.');
    }
}
