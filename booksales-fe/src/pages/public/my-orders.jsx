import { useEffect, useState } from "react";
import { getOrders } from "../../_services/order";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : (data?.data || []));
      } catch (error) {
        console.error("Gagal ambil pesanan saya:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="p-20 text-center text-indigo-600 animate-pulse">Memuat riwayat pesanan...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Riwayat Pesanan</h1>
          <p className="text-gray-500">Lihat status buku yang sudah kamu beli</p>
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
          <p className="text-gray-500 font-medium text-lg">Kamu belum pernah memesan buku apapun.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 items-center">
                <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img 
                    src={order.book?.cover_photo ? `http://localhost:8000/storage/books/${order.book.cover_photo}` : "https://via.placeholder.com/100x150"} 
                    className="w-full h-full object-cover"
                    alt={order.book?.title}
                  />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{order.order_number}</p>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{order.book?.title || "Buku"}</h3>
                  <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <p className="font-black text-xl text-gray-900">Rp{Number(order.total_amount).toLocaleString("id-ID")}</p>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  order.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 
                  order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                  'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                  {order.status || 'pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
