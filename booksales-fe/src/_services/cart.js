import API from "../_api";

// Fungsi pembantu untuk header token
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 1. Ambil isi keranjang
export const getCartItems = async () => {
  const { data } = await API.get("/cart", getAuthHeader());
  return data.data || data;
};

// 2. Tambah ke keranjang
export const addToCart = async (bookId, quantity = 1) => {
  const { data } = await API.post("/cart", { book_id: bookId, quantity }, getAuthHeader());
  return data;
};

// 3. Hapus dari keranjang
export const removeFromCart = async (id) => {
  const { data } = await API.delete(`/cart/${id}`, getAuthHeader());
  return data;
};

// 4. Update jumlah di keranjang
export const updateCartQuantity = async (id, quantity) => {
  const { data } = await API.put(`/cart/${id}`, { quantity }, getAuthHeader());
  return data;
};
