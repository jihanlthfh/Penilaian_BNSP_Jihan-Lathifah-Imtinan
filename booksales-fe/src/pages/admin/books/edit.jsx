import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { showBook, updateBook } from "../../../_services/books";

export default function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
    genre_id: "",
    author_id: "",
    description: "",
    cover_photo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil 3 data: Genres, Authors, dan Detail Buku
        const [genresData, authorsData, bookData] = await Promise.all([
          getGenres(),
          getAuthors(),
          showBook(id),
        ]);

        setGenres(genresData);
        setAuthors(authorsData);

        if (bookData) {
          setFormData({
            title: bookData.title || "",
            price: bookData.price || 0,
            stock: bookData.stock || 0,
            genre_id: bookData.genre_id || "",
            author_id: bookData.author_id || "",
            description: bookData.description || "",
            cover_photo: null, 
          });
        }
      } catch (error) {
        console.error("Gagal load data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // PENTING: Gunakan FormData agar file gambar bisa terkirim
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("genre_id", formData.genre_id);
      data.append("author_id", formData.author_id);
      data.append("description", formData.description);
      
      // Jika user milih file gambar baru, masukkan ke data
      if (formData.cover_photo) {
        data.append("cover_photo", formData.cover_photo);
      }

      // 1. Kirim data ke service updateBook
      await updateBook(id, data);

      // 2. Jika berhasil, langsung pindah ke halaman tabel admin
      // Jalur ini harus sama dengan yang ada di App.jsx ( /admin/books )
      navigate("/admin/books");

    } catch (error) {
      console.error("Update gagal:", error);
      alert("Gagal mengupdate buku. Cek kembali koneksi API kamu.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg dark:bg-gray-800 border border-gray-100">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Stock</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Genre</label>
              <select
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                value={formData.genre_id}
                onChange={(e) => setFormData({ ...formData, genre_id: e.target.value })}
              >
                <option value="">Select Genre</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Author</label>
              <select
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                value={formData.author_id}
                onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
              >
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Cover Photo</label>
              <input
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                file:bg-gray-200 file:border-0 file:me-4 file:py-2 file:px-4 file:text-gray-700 file:font-semibold hover:file:bg-gray-300"
                onChange={(e) => setFormData({ ...formData, cover_photo: e.target.files[0] })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                rows="4"
                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-8">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
              Update Book
            </button>
            <Link to="/admin/books" className="text-red-600 border border-red-600 font-medium rounded-lg text-sm px-5 py-2.5">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}