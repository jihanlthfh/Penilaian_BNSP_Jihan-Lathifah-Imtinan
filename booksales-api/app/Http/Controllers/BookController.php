<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     
     */
    public function index(Request $request)
    {
        // Mulai query builder (belum dijalankan ke database)
        // with(['author', 'genre']) = eager loading, ambil data relasi sekaligus
        $query = Book::with(['author', 'genre']);

        // --- Filter: Search berdasarkan judul atau nama penulis ---
        // Cek apakah ada parameter ?search= di URL
        if ($request->filled('search')) {
            $searchTerm = $request->search;

            // "where" di bawah mencari di kolom "title" ATAU nama author
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'LIKE', '%' . $searchTerm . '%')
                  ->orWhereHas('author', function ($authorQuery) use ($searchTerm) {
                      // whereHas = cari di tabel relasi (authors)
                      $authorQuery->where('name', 'LIKE', '%' . $searchTerm . '%');
                  });
            });
        }

        // --- Filter: Berdasarkan Genre ---
        // Cek apakah ada parameter ?genre_id= di URL
        if ($request->filled('genre_id')) {
            $query->where('genre_id', $request->genre_id);
        }

        // Jalankan query dan ambil hasilnya
        $books = $query->get();

        if ($books->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!"
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get all resources",
            "data" => $books
        ], 200);
    }

    /**
     * Menyimpan buku baru ke database.
     */
    public function store(Request $request)
    {
        // 1. Validasi input dari request
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:100',
            'description' => 'required|string',
            'price'       => 'required|numeric',
            'stock'       => 'required|integer',
            'cover_photo' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'genre_id'    => 'required|exists:genres,id',
            'author_id'   => 'required|exists:authors,id'
        ]);

        // 2. Jika ada error validasi, kembalikan pesan error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Upload gambar ke folder storage/books
        $image = $request->file('cover_photo');
        $image->store('books', 'public');

        // 4. Simpan data buku ke database
        $book = Book::create([
            'title'       => $request->title,
            'description' => $request->description,
            'price'       => $request->price,
            'stock'       => $request->stock,
            'cover_photo' => $image->hashName(),
            'genre_id'    => $request->genre_id,
            'author_id'   => $request->author_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Resource added successfully!',
            'data'    => $book
        ], 201);
    }

    /**
     * Menampilkan detail satu buku berdasarkan ID.
     */
    public function show(string $id)
    {
        // Ambil buku beserta data author dan genre-nya
        $book = Book::with(['author', 'genre'])->find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get detail resource',
            'data' => $book
        ], 200);
    }

    /**
     * Mengupdate data buku.
     */
    public function update(string $id, Request $request)
    {
        // 1. Cari buku
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found'
            ], 404);
        }

        // 2. Validasi
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:100',
            'description' => 'required|string',
            'price'       => 'required|numeric',
            'stock'       => 'required|integer',
            'cover_photo' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'genre_id'    => 'required|exists:genres,id',
            'author_id'   => 'required|exists:authors,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Siapkan data update
        $data = [
            'title'       => $request->title,
            'description' => $request->description,
            'price'       => $request->price,
            'stock'       => $request->stock,
            'genre_id'    => $request->genre_id,
            'author_id'   => $request->author_id,
        ];

        // 4. Jika ada foto baru, upload dan hapus yang lama
        if ($request->hasFile('cover_photo')) {
            $image = $request->file('cover_photo');
            $image->store('books', 'public');

            if ($book->cover_photo) {
                Storage::disk('public')->delete('books/' . $book->cover_photo);
            }

            $data['cover_photo'] = $image->hashName();
        }

        // 5. Simpan perubahan
        $book->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated successfully!',
            'data' => $book
        ], 200);
    }

    /**
     * Menghapus buku.
     */
    public function destroy(string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found!'
            ], 404);
        }

        // Hapus gambar dari storage jika ada
        if ($book->cover_photo) {
            Storage::disk('public')->delete('books/' . $book->cover_photo);
        }

        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete resource successfully',
        ]);
    }
}
