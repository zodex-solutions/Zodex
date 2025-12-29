import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: config.API_URL,

  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },

  withCredentials: false,
});

export default axiosInstance;
