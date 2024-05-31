import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://api.giphy.com/v1/gifs",
});

export const giphyApi = createApi({
  reducerPath: "giphyApi",
  baseQuery: baseQuery,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getTrendingGIFs: build.query({
      query: (params: { limit: number }) => ({
        url: `trending`,
        method: "GET",
        params: { ...params, api_key: import.meta.env.VITE_GIPHY_API_KEY },
      }),
    }),
    searchGIFs: build.query({
      query: (params: { limit: number; q: string }) => ({
        url: `search`,
        method: "GET",
        params: { ...params, api_key: import.meta.env.VITE_GIPHY_API_KEY },
      }),
    }),
    // getGIFs: build.query({
    //   query: (params: { search: string; limit: number }) => ({
    //     url: ``,
    //     method: "GET",
    //     params: { ...params, api_key: import.meta.env.VITE_GIPHY_API_KEY },
    //   }),
    // }),
  }),
});

export const { useGetTrendingGIFsQuery, useLazySearchGIFsQuery } = giphyApi;
