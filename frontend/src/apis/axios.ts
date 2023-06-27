import axios from "axios";
import { baseURL } from "../../constants";

export const menuApi = axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});
