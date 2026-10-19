import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchData(path: string, options?: AxiosRequestConfig) {
  const response = await api.get(path, options);
  return response.data;
}
