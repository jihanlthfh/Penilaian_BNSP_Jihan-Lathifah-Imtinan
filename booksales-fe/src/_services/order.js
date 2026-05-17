import API from "../_api";

// Fungsi untuk mengambil token login
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Simpan transaksi baru ke database
 */
export const createTransaction = async (transactionData) => {
  try {
    // Pastikan kita mengirim token agar Laravel tahu siapa yang beli
    const { data } = await API.post("/transactions", transactionData, getAuthHeader());
    return data;
  } catch (error) {
    console.error("Error Create Transaction:", error);
    throw error;
  }
};

/**
 * Ambil riwayat pesanan milik user yang sedang login
 */
export const getOrders = async () => {
  try {
    const { data } = await API.get("/transactions", getAuthHeader());
    return data.data || data;
  } catch (error) {
    console.error("Error Get My Orders:", error);
    throw error;
  }
};
