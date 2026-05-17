import API from "../_api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUsers = async () => {
  try {
    const { data } = await API.get("/users", getAuthHeader());
    return data.data || data;
  } catch (error) {
    console.error("Error Get Users:", error);
    throw error;
  }
};
