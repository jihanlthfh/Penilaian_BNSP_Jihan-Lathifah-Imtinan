import API from "../_api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAuthors = async () => {
  const { data } = await API.get("/authors");
  return data.data || data;
};

export const createAuthor = async (payload) => {
  const { data } = await API.post("/authors", payload, getAuthHeader());
  return data;
};

export const updateAuthor = async (id, payload) => {
  const { data } = await API.put(`/authors/${id}`, payload, getAuthHeader());
  return data;
};

export const deleteAuthor = async (id) => {
  const { data } = await API.delete(`/authors/${id}`, getAuthHeader());
  return data;
};