import axios from "axios";

const authAPI = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL,
  timeout: 5000
});

export default authAPI;