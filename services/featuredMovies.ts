import { baseApi } from "@/api/baseApi";

export const suiteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedData: builder.query<{ data: [] }, void>({
      query: () => ({
        url: "http://localhost:3000/api",
      }),
    }),
  }),
});

export const { useGetFeaturedDataQuery } = suiteApi;
