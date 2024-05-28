import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { TAGS } from "../utils/constants";
import { toast } from "@/components/ui/use-toast";


const baseQuery = fetchBaseQuery({
  baseUrl: "https:localhost",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    headers.set("accept", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi) => {
  const result = await baseQuery(args, api, {});
  if (result?.error?.status === 401) {
    toast({description:"Not authorized", variant:"destructive"});
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(TAGS),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "user/login-super-admin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
