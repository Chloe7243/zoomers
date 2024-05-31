import { TAGS } from "@/utils/constants";
import { api } from ".";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: `feed/get-posts`,
        method: "GET",
      }),
      providesTags: [TAGS.POSTS],
    }),
    getPostById: builder.query({
      query: (id: string) => ({
        url: `feed/get-post/${id}`,
        method: "GET",
      }),
      
    }),
    likePost: builder.mutation({
      query: (id: string) => ({
        url: `feed/like-post/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [TAGS.POST, TAGS.USER],
    }),
    unlikePost: builder.mutation({
      query: (id: string) => ({
        url: `feed/unlike-post/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [TAGS.POST, TAGS.USER],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = postsApi;
