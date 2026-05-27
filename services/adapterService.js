import axios from "axios";

const adapterAPI = axios.create({
  baseURL: process.env.ADAPTER_SERVICE_URL
});

export default adapterAPI;