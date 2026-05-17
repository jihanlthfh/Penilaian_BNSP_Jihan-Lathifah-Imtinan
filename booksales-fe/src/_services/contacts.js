import API from "../_api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// User kirim pesan — public, tidak perlu token
export const submitContact = async (data) => {
  try {
    const response = await API.post("/contacts", data);
    return response.data;
  } catch (error) {
    console.error("Error Submit Contact:", error);
    throw error;
  }
};


export const getContacts = async () => {
  try {
    const { data } = await API.get("/contacts", getAuthHeader());
    return data.data || data;
  } catch (error) {
    console.error("Error Get Contacts:", error);
    throw error;
  }
};


export const updateContactStatus = async (id, status) => {
  try {
    const { data } = await API.put(`/contacts/${id}`, { status }, getAuthHeader());
    return data;
  } catch (error) {
    console.error("Error Update Contact Status:", error);
    throw error;
  }
};