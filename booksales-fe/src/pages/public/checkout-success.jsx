/**
 * === HALAMAN CHECKOUT BERHASIL ===
 * 
 * Halaman ini muncul setelah user berhasil checkout.
 * Menampilkan pesan sukses dan tombol untuk buka WhatsApp admin.
 * 
 * Data dikirim dari halaman Cart melalui navigate() state.
 */

import { Link, useLocation } from "react-router-dom";

export default function CheckoutSuccess() {
  // useLocation = mengambil data yang dikirim dari halaman sebelumnya (Cart)
  const location = useLocation();
  const { waURL, totalHarga, itemCount } = location.state || {};

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">
      <div className="mx-auto max-w-screen-sm px-4">
        
        {/* Card Sukses */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center dark:bg-gray-800 dark:border-gray-700">
          
          {/* Icon centang hijau */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>

          {/* Judul */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pesanan Berhasil Dibuat! 🎉
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Pesananmu sudah disimpan. Silakan konfirmasi ke admin via WhatsApp untuk memproses pesanan.
          </p>

          {/* Info Ringkasan */}
          {totalHarga && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Jumlah item:</span>
                <span className="font-medium">{itemCount} buku</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                <span className="font-black text-indigo-600 dark:text-indigo-400 text-lg">
                  Rp{totalHarga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}

          {/* Tombol WhatsApp */}
          {waURL ? (
            <a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-green-700 transition-colors shadow-sm text-base"
            >
              {/* Icon WhatsApp */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kirim Pesanan via WhatsApp
            </a>
          ) : (
            <p className="text-red-500 text-sm">
              Data checkout tidak ditemukan. Silakan kembali ke keranjang.
            </p>
          )}

          {/* Link navigasi */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/books" 
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium dark:text-indigo-400"
            >
              ← Lanjut Belanja
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link 
              to="/" 
              className="text-sm text-gray-500 hover:text-gray-700 font-medium dark:text-gray-400"
            >
              Kembali ke Home
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
