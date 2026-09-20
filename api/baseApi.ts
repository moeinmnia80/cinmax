import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
