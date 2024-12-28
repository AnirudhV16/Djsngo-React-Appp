import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL,
});

// Add request interceptor to handle token refresh
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    //else{
      //refresh=localStorage.getItem("refresh")
      //refreshToken()
    //}
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${baseURL}user/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", response.data.access);
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

//const refreshToken=()=>{
  //access=localStorage.get("access")
//}

export default api;
