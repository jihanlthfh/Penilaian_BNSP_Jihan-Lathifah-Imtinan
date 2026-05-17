import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const loadAuthData = () => {
      const savedToken = localStorage.getItem("accessToken");
      const savedInfo = localStorage.getItem("userInfo") || localStorage.getItem("UserInfo");
      if (savedToken) setToken(savedToken);
      if (savedInfo) {
        try {
          setUserInfo(JSON.parse(savedInfo));
        } catch (e) {
          console.error("Error parsing userInfo", e);
        }
      }
    };
    loadAuthData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserInfo({});
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        
        {/* --- KIRI: LOGO --- */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-indigo-600 p-1.5 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-100">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
            Book<span className="text-indigo-600">Store</span>
          </span>
        </Link>

        {/* --- TENGAH: MENU UTAMA --- */}
        <div className="hidden md:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors text-gray-900">About Us</Link>
          <Link to="/books" className="hover:text-indigo-600 transition-colors">Katalog</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          {token && (
            <Link to="/my-orders" className="text-indigo-600 border-l border-gray-200 pl-8 font-black">Pesanan Saya</Link>
          )}
        </div>

        {/* --- KANAN: USER / AUTH --- */}
        <div className="flex items-center gap-6 shrink-0">
          {token ? (
            <div className="flex items-center gap-5">
              <Link to="/cart" className="relative text-gray-400 hover:text-indigo-600 transition-all hover:scale-110">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
              
              <div className="hidden sm:flex flex-col items-end leading-none">
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1">User Aktif</span>
                <span className="text-xs font-black text-gray-800">{userInfo.name || "User"}</span>
              </div>

              <button 
                onClick={handleLogout}
                className="text-[10px] font-black text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-red-100"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[11px] font-black text-gray-400 hover:text-gray-900 transition-colors">MASUK</Link>
              <Link to="/register" className="bg-gray-900 text-white text-[10px] font-black px-6 py-3 rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-gray-100 tracking-widest">
                DAFTAR
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}