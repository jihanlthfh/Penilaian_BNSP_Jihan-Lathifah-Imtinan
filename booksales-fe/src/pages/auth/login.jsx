import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hook ini tetap dipanggil, tapi kita akan validasi di dalam useEffect
  const token = localStorage.getItem("accessToken");
  const decodedData = useDecodeToken(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);

      // 1. Simpan ke LocalStorage 
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      // 2. Berikan delay sangat singkat atau langsung navigasi berdasarkan response
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal, cek kembali email/password.");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIKA REDIRECT OTOMATIS (Jika user sudah login sebelumnya) ---
  useEffect(() => {
  
    if (token && decodedData?.success) {
      const savedInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      
      // Redirect 
      if (savedInfo.role === "admin") {
        navigate("/admin");
      } else if (savedInfo.role) {
        navigate("/");
      }
    }
  }, [token, decodedData, navigate]);

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full">
          
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
                Masuk ke Akunmu
              </h1>

              {error && (
                <div className="p-3 text-sm text-red-700 rounded-lg bg-red-50 border border-red-200" role="alert">
                  <span className="font-medium">Gagal!</span> {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Email
                  </label>
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
                <div>
                  <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
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
                      Masuk...
                    </span>
                  ) : "Masuk"}
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Belum punya akun?{" "}
                  <Link to="/register" className="font-medium text-indigo-600 hover:underline">
                    Daftar di sini
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}