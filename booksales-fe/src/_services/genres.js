import API from "../_api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Ambil semua genre (public, tidak perlu login)
export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data.data || data;
};

// Tambah genre baru (admin only)
export const createGenre = async (payload) => {
  const { data } = await API.post("/genres", payload, getAuthHeader());
  return data;
};

// Update genre (admin only)
export const updateGenre = async (id, payload) => {
  const { data } = await API.put(`/genres/${id}`, payload, getAuthHeader());
  return data;
};

// Hapus genre (admin only)
export const deleteGenre = async (id) => {
  const { data } = await API.delete(`/genres/${id}`, getAuthHeader());
  return data;
};