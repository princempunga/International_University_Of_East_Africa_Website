<?php

namespace App\Http\Controllers\Api;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;

class NewsletterController extends BaseController
{
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletter_subscribers,email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $subscriber = NewsletterSubscriber::create([
            'email' => $request->email,
            'name' => $request->name,
            'status' => 'active',
            'subscribed_at' => now(),
        ]);

        return $this->sendResponse($subscriber, 'Thank you for subscribing to our newsletter!');
    }

    public function unsubscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $subscriber = NewsletterSubscriber::where('email', $request->email)->first();
        if ($subscriber) {
            $subscriber->update([
                'status' => 'unsubscribed',
                'unsubscribed_at' => now(),
            ]);
        }

        return $this->sendResponse([], 'You have been unsubscribed from our newsletter.');
    }

    public function getSubscribers(): JsonResponse
    {
        $subscribers = NewsletterSubscriber::latest()->paginate(20);
        return $this->sendResponse($subscribers->items(), 'Subscribers retrieved successfully.', [
            'total' => $subscribers->total(),
            'per_page' => $subscribers->perPage(),
            'current_page' => $subscribers->currentPage(),
        ]);
    }
}
