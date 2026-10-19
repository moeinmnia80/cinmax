import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getData(path: string, options?: AxiosRequestConfig) {
  const response = await api.get(path, options);
  return response.data;
}
export async function postData(path: string, options?: AxiosRequestConfig) {
  const response = await api.post(path, { ...options });
  return response.data;
}
