import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../../_services/admin-order";

export default function AdminOrders() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [message, setMessage]           = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setTransactions(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
      console.error("Gagal ambil data transaksi:", error);
      setMessage("Gagal memuat data transaksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await getAllOrders();
        setTransactions(Array.isArray(data) ? data : (data?.data || []));
      } catch (error) {
        console.error("Gagal ambil data transaksi:", error);
        setMessage("Gagal memuat data transaksi.");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setMessage(`Status transaksi #${id} diperbarui menjadi ${newStatus}!`);
      fetchTransactions();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status.");
    }
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center font-medium animate-pulse text-indigo-600">
          Memuat Data Transaksi...
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Riwayat Transaksi & Validasi
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total: {transactions.length} transaksi tercatat
            </p>
          </div>
        </div>

        {message && (
          <div className="mx-4 mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            {message}
          </div>
        )}

        {/* Tabel */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Pembeli</th>
                <th className="px-4 py-3">Buku</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Total Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Validasi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((trx) => (
                  <tr key={trx.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400">
                      {trx.order_number}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs">
                      {formatTanggal(trx.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {trx.user?.name || "User"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{trx.book?.title || "Buku"}</span>
                        <span className="text-[10px] text-gray-500 italic">ID: {trx.book_id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">
                      x{trx.quantity || 1}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                      Rp{Number(trx.total_amount || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        trx.status === "success"   ? "bg-green-100 text-green-700" :
                        trx.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {trx.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(trx.id, "success")}
                          className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-lg transition-colors"
                          title="Konfirmasi"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleStatusChange(trx.id, "cancelled")}
                          className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition-colors"
                          title="Batalkan"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    Belum ada transaksi penjualan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}