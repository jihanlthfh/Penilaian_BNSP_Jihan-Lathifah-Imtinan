import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
        
        {/* Badge */}
        <Link
          to="/books"
          className="inline-flex items-center py-1 px-1 pr-4 mb-6 text-sm text-gray-700 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span className="text-xs bg-indigo-600 rounded-full text-white px-3 py-1 mr-3">
            Baru
          </span>
          <span className="text-sm font-medium">
            Koleksi buku terbaru sudah tersedia!
          </span>
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>

        {/* Judul Utama */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          Temukan Buku
          <span className="text-indigo-600"> Favoritmu</span>
        </h1>

        {/* Deskripsi */}
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          Jelajahi ribuan koleksi buku dari berbagai genre. Pesan langsung dan 
          konfirmasi via WhatsApp — mudah, cepat, dan terpercaya.
        </p>

        {/* Tombol CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            to="/books"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Lihat Katalog
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Daftar Akun
          </Link>
        </div>

        {/* Statistik Singkat */}
        <div className="flex flex-wrap justify-center gap-8 text-center mt-4">
          <div>
            <p className="text-2xl font-bold text-indigo-600">500+</p>
            <p className="text-sm text-gray-500">Judul Buku</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-600">1.2K+</p>
            <p className="text-sm text-gray-500">Pelanggan</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-600">4.8</p>
            <p className="text-sm text-gray-500">Rating ⭐</p>
          </div>
        </div>

      </div>
    </section>
  );
}
