export default function Testimonial() {
  return (
    <section className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-screen-xl px-4 py-12 mx-auto text-center lg:py-16 lg:px-6">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Apa Kata Pelanggan Kami
        </h2>

        <div className="grid gap-6 md:grid-cols-3 max-w-screen-lg mx-auto">
          {/* Testimoni 1 */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              "Proses belanja sangat mudah. Tinggal pilih buku, checkout, langsung diarahkan ke WhatsApp. Praktis banget!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">A</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Andi Pratama</p>
                <p className="text-xs text-gray-500">Mahasiswa</p>
              </div>
            </div>
          </div>

          {/* Testimoni 2 */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              "Koleksi bukunya lengkap dan harga terjangkau. Respons admin lewat WhatsApp juga cepat. Recommended!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">S</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Siti Nurhaliza</p>
                <p className="text-xs text-gray-500">Guru</p>
              </div>
            </div>
          </div>

          {/* Testimoni 3 */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              "Website-nya simpel dan gampang dipakai. Buku sampai dengan cepat. Pasti belanja lagi di sini!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">B</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Budi Santoso</p>
                <p className="text-xs text-gray-500">Karyawan</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
