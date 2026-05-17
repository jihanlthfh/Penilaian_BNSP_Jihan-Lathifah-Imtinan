import API from "../_api";

export const getBooks = async (search = "") => {
  try {
    const url = search ? `/books?search=${search}` : "/books";
    const { data } = await API.get(url);
    return data.data || data; 
  } catch (error) {
    console.error("Error Get Books:", error);
    throw error;
  }
};

export const createBook = async (formData) => {
  try {
    const response = await API.post("/books", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    console.error("Error Create Book:", error);
    throw error;
  }
};

// Gunakan fungsi ini untuk Detail
export const getBookById = async (id) => {
  try {
    const { data } = await API.get(`/books/${id}`);
    return data.data || data;
  } catch (error) {
    console.error(`Error Get Book ID ${id}:`, error);
    throw error;
  }
};

export const updateBook = async (id, formData) => {
  try {
    if (formData instanceof FormData) {
      formData.append("_method", "PUT");
    }
    const response = await API.post(`/books/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    console.error(`Error Update Book ID ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await API.delete(`/books/${id}`);
  } catch (error) {
    console.error(`Error Delete Book ID ${id}:`, error);
    throw error;
  }
};

export const showBook = getBookById;