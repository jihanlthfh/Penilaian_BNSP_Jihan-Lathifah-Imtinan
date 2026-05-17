import API from "../_api";

/**
 * === SERVICE ADMIN ORDER ===
 * File ini berisi fungsi khusus untuk ADMIN
 * untuk melihat dan mengelola semua pesanan user.
 * 
 * Bedanya dengan order.js biasa:
 * - order.js = untuk user (hanya lihat pesanan sendiri)
 * - admin-order.js = untuk admin (bisa lihat SEMUA pesanan semua user)
 */

// Fungsi untuk mendapatkan header token login admin
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Ambil SEMUA pesanan dari SEMUA user (khusus admin)
 * Method: GET /api/admin/orders
 */
export const getAllOrders = async () => {
  try {
    const { data } = await API.get("/transactions", getAuthHeader());
    return data.data || data;
  } catch (error) {
    console.error("Error Get All Orders:", error);
    throw error;
  }
};

/**
 * Update status pesanan (di sini kita gunakan endpoint update transaksi)
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data } = await API.put(
      `/transactions/${orderId}`,
      { status }, // Pastikan backend mendukung update status jika diperlukan
      getAuthHeader()
    );
    return data;
  } catch (error) {
    console.error("Error Update Transaction:", error);
    throw error;
  }
};
