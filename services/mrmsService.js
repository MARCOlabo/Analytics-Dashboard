import axios from "axios";
const mrmsAPI = axios.create({
  baseURL: process.env.MRMS_SERVICE_URL
});

export default mrmsAPI;