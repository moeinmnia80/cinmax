import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchData(path: string) {
  const response = await api.get(path);
  return response.data;
}
