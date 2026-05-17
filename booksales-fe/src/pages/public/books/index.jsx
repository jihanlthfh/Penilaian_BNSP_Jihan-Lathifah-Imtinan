import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../../_services/books";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await getBooks(activeSearch);
        // PERBAIKAN: Ambil data dari response.data jika menggunakan Laravel Resource
        const actualData = response?.data || response;
        setBooks(Array.isArray(actualData) ? actualData : []);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [activeSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center p-10 font-medium animate-pulse text-indigo-600">
          Memuat Katalog Buku...
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        
        {/* Form Pencarian */}
        <div className="mb-8 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input 
                type="text" 
                id="simple-search" 
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-3 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 transition-colors" 
                placeholder="Cari judul buku..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="p-3 ml-2 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 shadow-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        <div className="mb-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div 
                key={book.id} 
                className="flex flex-col h-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
              >
                {/* Bagian Gambar */}
                <div className="h-72 w-full mb-5 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  <Link to={`/books/${book.id}`} className="w-full h-full">
                    <img
                      className="mx-auto h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                      // PERBAIKAN: Gunakan folder /storage/books/ karena di VSCode kamu filenya ada di sana
                      src={book.cover_photo 
                        ? `http://localhost:8000/storage/books/${book.cover_photo}` 
                        : "https://via.placeholder.com/400x600?text=No+Cover"}
                      alt={book.title}
                      // Handler Cadangan (Fallback) jika path storage berbeda
                      onError={(e) => { 
                        if (!e.target.src.includes('placeholder')) {
                          e.target.onerror = null;
                          // Coba akses langsung ke root storage jika folder /books/ gagal
                          e.target.src = `http://localhost:8000/storage/${book.cover_photo}`;
                        }
                      }}
                    />
                  </Link>
                </div>

                {/* Konten Informasi */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/books/${book.id}`}
                      className="text-lg font-bold leading-tight text-gray-900 hover:text-indigo-600 dark:text-white line-clamp-2 mb-2"
                    >
                      {book.title}
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg>
                        Fast Delivery
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Best Price
                      </span>
                    </div>
                  </div>

                  {/* Bagian Harga & Tombol */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Harga</p>
                      <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                        Rp{Number(book.price || 0).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <Link
                      to={`/books/${book.id}`}
                      className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-all"
                    >
                      View detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              <p className="text-xl font-medium">Belum ada koleksi buku.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}