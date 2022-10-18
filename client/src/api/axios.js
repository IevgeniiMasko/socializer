import axios from "axios";

const BASE_URL = "https://socializer1.herokuapp.com";

//General axios
export default axios.create({ baseURL: BASE_URL, withCredentials: true });

//Private axios
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
