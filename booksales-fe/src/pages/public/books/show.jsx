import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookById } from "../../../_services/books";
import { addToCart } from "../../../_services/cart";

export default function BookShow() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // =========================================
  // FETCH BOOK
  // =========================================
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const data = await getBookById(id);

        console.log("DETAIL BOOK:", data);

        setBook(data);
      } catch (error) {
        console.error("Gagal mengambil detail buku:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // =========================================
  // QUANTITY
  // =========================================
  const increaseQty = () => {
    if (book && quantity < book.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================================
  // ADD TO CART
  // =========================================
  const handleAddToCart = async () => {
    try {
      if (!book) return;

      await addToCart(book.id, quantity);

      setMessage(
        `${quantity} buku berhasil dimasukkan ke keranjang!`
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Gagal tambah ke keranjang:", error);

      alert(
        "Gagal masuk keranjang. Pastikan kamu sudah login."
      );
    }
  };

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="p-20 text-center text-indigo-600 text-xl font-semibold animate-pulse">
        Memuat detail buku...
      </div>
    );
  }

  // =========================================
  // NOT FOUND
  // =========================================
  if (!book) {
    return (
      <div className="p-20 text-center text-red-500 text-xl font-bold">
        Buku tidak ditemukan.
      </div>
    );
  }

  // =========================================
  // MAIN UI
  // =========================================
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen py-10 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">

        <div className="lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16">

          {/* ========================================= */}
          {/* COVER */}
          {/* ========================================= */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">

            <img
              className="w-full rounded-2xl shadow-2xl border border-gray-100 object-cover"
              src={
                book.cover_photo
                  ? `http://localhost:8000/storage/books/${book.cover_photo}`
                  : "https://via.placeholder.com/400x600"
              }
              alt={book.title || "Book Cover"}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x600?text=No+Cover";
              }}
            />

          </div>

          {/* ========================================= */}
          {/* DETAIL */}
          {/* ========================================= */}
          <div className="mt-8 lg:mt-0">

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {book.title || "Tanpa Judul"}
            </h1>

            {/* AUTHOR */}
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Penulis :{" "}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {book.author?.name || "Unknown Author"}
              </span>
            </p>

            {/* PRICE */}
            <div className="mt-5">
              <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                Rp
                {Number(book.price || 0).toLocaleString("id-ID")}
              </p>
            </div>

            {/* ========================================= */}
            {/* INFO CARD */}
            {/* ========================================= */}
            <div className="mt-8 flex flex-wrap gap-4">

              {/* STOCK */}
              <div className="bg-indigo-50 border border-indigo-100 px-5 py-4 rounded-xl shadow-sm">
                <p className="text-[11px] uppercase tracking-wider text-indigo-500 font-bold">
                  Stok Tersedia
                </p>

                <p className="text-2xl font-black text-indigo-700">
                  {book.stock || 0}

                  <span className="text-sm font-medium ml-1">
                    pcs
                  </span>
                </p>
              </div>

              {/* CATEGORY */}
              <div className="bg-gray-50 border border-gray-100 px-5 py-4 rounded-xl shadow-sm">
                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                  Kategori
                </p>

                <p className="text-lg font-bold text-gray-700">
                  {book.genre?.name || "Umum"}
                </p>
              </div>

              {/* AUTHOR CARD */}
              <div className="bg-purple-50 border border-purple-100 px-5 py-4 rounded-xl shadow-sm">
                <p className="text-[11px] uppercase tracking-wider text-purple-500 font-bold">
                  Author
                </p>

                <p className="text-lg font-bold text-purple-700">
                  {book.author?.name || "Unknown"}
                </p>
              </div>

            </div>

            {/* ========================================= */}
            {/* DESCRIPTION */}
            {/* ========================================= */}
            <div className="mt-10">

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Deskripsi Buku
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                {book.description ||
                  "Tidak ada deskripsi untuk buku ini."}
              </p>

            </div>

            {/* ========================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ========================================= */}
            {message && (
              <div className="mt-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-xl font-medium animate-pulse">
                {message}
              </div>
            )}

            {/* ========================================= */}
            {/* ACTION */}
            {/* ========================================= */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5 items-center">

              {/* QUANTITY */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-sm">

                <button
                  onClick={decreaseQty}
                  className="px-5 py-3 hover:bg-gray-200 transition font-bold text-xl"
                >
                  −
                </button>

                <span className="px-6 py-3 min-w-[70px] text-center text-xl font-black bg-white border-x-2 border-gray-200">
                  {quantity}
                </span>

                <button
                  onClick={increaseQty}
                  className="px-5 py-3 hover:bg-gray-200 transition font-bold text-xl"
                >
                  +
                </button>

              </div>

              {/* BUTTON */}
              <button
                onClick={handleAddToCart}
                disabled={book.stock <= 0}
                className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition-all disabled:bg-gray-300 disabled:shadow-none"
              >
                {book.stock > 0
                  ? "Tambah ke Keranjang"
                  : "Stok Habis"}
              </button>

            </div>

            {/* BACK BUTTON */}
            <Link
              to="/books"
              className="inline-block mt-8 text-sm text-gray-500 hover:text-indigo-600 transition"
            >
              ← Kembali ke Katalog
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}