import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "@/components/ui/use-toast";
import { TAGS, authTokenKey } from "../utils/constants";
import { UserCredentials } from "@/types";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(authTokenKey);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("accept", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi
) => {
  const result = await baseQuery(args, api, {});
  if (result?.error?.status === 401) {
    toast({ description: "Not authorized", variant: "destructive" });
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(TAGS),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "auth/login-user",
        method: "POST",
        body: credentials,
      }),
    }),
    createUser: builder.mutation({
      query: (credentials: UserCredentials) => ({
        url: "auth/signup-user",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = api;
