import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../_services/books";
import { getAllOrders } from "../../_services/admin-order";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksData, ordersData] = await Promise.all([
          getBooks(),
          getAllOrders().catch(() => []) 
        ]);

        const booksList = Array.isArray(booksData) ? booksData : [];
        const ordersList = Array.isArray(ordersData) ? ordersData : (ordersData?.data || []);

        const revenue = ordersList.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

        setStats({
          totalBooks: booksList.length,
          totalOrders: ordersList.length,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-indigo-600 font-medium text-lg">
          Memuat Dashboard...
        </div>
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Ringkasan statistik toko BookStore kamu hari ini.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card Total Buku */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Buku</p>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white">
              {stats.totalBooks}
            </h3>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center dark:bg-indigo-900/50 dark:text-indigo-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
        </div>

        {/* Card Total Pesanan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Pesanan Masuk</p>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white">
              {stats.totalOrders}
            </h3>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center dark:bg-blue-900/50 dark:text-blue-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
        </div>

        {/* Card Total Pendapatan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Pendapatan</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Rp {stats.totalRevenue.toLocaleString("id-ID")}
            </h3>
          </div>
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center dark:bg-green-900/50 dark:text-green-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

      </div>

      {/* Quick Actions / Jalan Pintas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/admin/books/create"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            + Tambah Buku Baru
          </Link>
          <Link 
            to="/admin/books"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Lihat Daftar Buku
          </Link>
          <Link 
            to="/admin/transactions"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Lihat Pesanan Masuk
          </Link>
        </div>
      </div>

    </section>
  );
}