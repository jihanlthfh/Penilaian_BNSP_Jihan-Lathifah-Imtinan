import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../_services/auth"; 

export default function Register() {
  const navigate = useNavigate();

  // 1. State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi Frontend
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setError("Semua field wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      // Mengirim data ke Laravel
      const result = await register(formData);
      
      if (result) {
        alert("Registrasi Berhasil! Silakan masuk.");
        navigate("/login");
      }
    } catch (err) {
      // Menangkap error dari Laravel (misal: email/username sudah ada)
      setError(err.response?.data?.message || "Registrasi Gagal. Periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-6">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-xl font-bold text-gray-900">Book<span className="text-indigo-600">Store</span></span>
        </Link>

        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 sm:max-w-md">
          <div className="p-6 space-y-5 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Daftar Akun Baru
            </h1>

            {error && (
              <div className="p-3 text-sm text-red-700 rounded-lg bg-red-50 border border-red-200" role="alert">
                <span className="font-medium">Gagal!</span> {error}
              </div>
            )}

          {/* autoComplete="off" pada form membantu mencegah saran email yang salah */}
          <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            
            {/* 1. FULL NAME */}
            <div>
              <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* 2. EMAIL */}
            <div>
              <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="nama@email.com"
                required
              />
            </div>

            {/* 3. USERNAME */}
            <div>
              <label htmlFor="username" className="block mb-1.5 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="nama_user" 
                required
              />
            </div>

            {/* 4. PASSWORD */}
            <div>
              <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : "Daftar Akun"}
            </button>

            <p className="text-sm text-gray-500 text-center">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                Masuk di sini
              </Link>
            </p>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}