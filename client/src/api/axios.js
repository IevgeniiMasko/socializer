import axios from "axios";

const BASE_URL = "http://localhost:3500";

//General axios
export default axios.create({ baseURL: BASE_URL, withCredentials: true });

//Private axios
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
