<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Simpan pesan baru dari pengunjung (Public)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $contact = Contact::create([
            'name'    => $request->name,
            'email'   => $request->email,
            'message' => $request->message,
            'status'  => 'unread' // default status
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim! Terima kasih telah menghubungi kami.',
            'data'    => $contact
        ], 201);
    }

    /**
     * Ambil semua pesan untuk Admin
     */
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data'    => $contacts
        ], 200);
    }

    /**
     * Update status pesan (misal jadi 'read' atau 'resolved')
     */
    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Pesan tidak ditemukan'
            ], 404);
        }

        $contact->update([
            'status' => $request->status ?? 'read'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status pesan berhasil diperbarui',
            'data'    => $contact
        ], 200);
    }
}
