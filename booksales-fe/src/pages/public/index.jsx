import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header Sederhana */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Selamat Datang di BookStore</h1>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Konten About Us (Menjadi Tampilan Utama) */}
        <div className="text-gray-600 leading-relaxed space-y-12 text-lg">
          
          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">📖</span>
              Tentang Kami
            </h2>
            <p>
              BookStore adalah platform toko buku digital yang didedikasikan untuk para pecinta literasi di seluruh Indonesia. 
              Berawal dari keinginan untuk memudahkan akses terhadap bacaan berkualitas, kami menghadirkan berbagai koleksi 
              buku pilihan yang bisa kamu jelajahi kapan saja dan di mana saja.
            </p>
          </section>

          <section className="bg-indigo-50 p-10 rounded-[40px] border border-indigo-100 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 text-8xl opacity-10 grayscale">📖</div>
            <h2 className="text-2xl font-black text-indigo-900 mb-4 italic">Visi & Misi</h2>
            <p className="text-indigo-800 font-medium">
              "Menjadi jembatan antara inspirasi penulis dan imajinasi pembaca melalui teknologi yang memudahkan 
              akses terhadap buku berkualitas tanpa batasan jarak."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">⭐</span>
              Kenapa Memilih Kami?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Koleksi Terkurasi</h4>
                <p className="text-sm">Kami hanya menyediakan buku-buku terbaik dari penerbit terpercaya.</p>
              </div>
              <div className="p-6 border border-gray-100 rounded-3xl hover:bg-gray-50 transition-colors">
                <h4 className="font-bold text-gray-900 mb-2">Checkout Mudah</h4>
                <p className="text-sm">Sistem pesanan yang terintegrasi langsung dengan WhatsApp Admin.</p>
              </div>
            </div>
          </section>

          {/* Tombol Aksi Sederhana */}
          <div className="pt-10 text-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Mulai Petualangan Membacamu</p>
            <Link 
              to="/books" 
              className="inline-block px-14 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-100 transform hover:-translate-y-1"
            >
              Lihat Katalog Buku
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}