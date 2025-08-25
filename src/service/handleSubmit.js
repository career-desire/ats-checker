import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/ats-report`,
  withCredentials: true,
});

export const handleSubmit = async (token, file, description, user) => {
  try {
    const formData = new FormData();
    formData.append("resume", file); 
    formData.append("description", description);
    formData.append("user", JSON.stringify(user)); 
    
    const response = await API.post("/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};