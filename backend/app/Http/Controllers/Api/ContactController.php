<?php

namespace App\Http\Controllers\Api;

use App\Models\Contact;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Http\JsonResponse;

class ContactController extends BaseController
{
    public function index(): JsonResponse
    {
        $contacts = Contact::latest()->paginate(15);
        return $this->sendResponse($contacts->items(), 'Contact messages retrieved successfully.', [
            'total' => $contacts->total(),
            'per_page' => $contacts->perPage(),
            'current_page' => $contacts->currentPage(),
        ]);
    }

    public function show($id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        if ($contact->status === 'unread') {
            $contact->update(['status' => 'read']);
        }
        return $this->sendResponse($contact, 'Contact message retrieved successfully.');
    }

    public function submit(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $contact = Contact::create($request->all());

        return $this->sendResponse($contact, 'Thank you! Your message has been submitted.');
    }

    public function reply(Request $request, $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'message' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        // In a real app, you would send an email here
        // Mail::to($contact->email)->send(new ContactReply($request->message));

        $contact->update([
            'status' => 'replied',
            'replied_at' => now(),
            'reply_message' => $request->message,
        ]);

        return $this->sendResponse($contact, 'Reply sent successfully.');
    }

    public function markAsRead($id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['status' => 'read']);
        return $this->sendResponse($contact, 'Message marked as read.');
    }

    public function destroy($id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return $this->sendResponse([], 'Message deleted successfully.');
    }
}
