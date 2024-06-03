import { PostData } from "@/types";
import { api } from ".";
import { TAGS } from "@/utils/constants";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (id?: string) => ({
        url: `user/user-details`,
        method: "GET",
        params: id ? { id } : undefined,
      }),
      providesTags: [TAGS.USER],
    }),
    addNewPost: builder.mutation({
      query: (postData: PostData) => ({
        url: `user/add-new-post`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: [TAGS.POST, TAGS.USER],
    }),
    editPost: builder.mutation({
      query: ({ id, ...body }: { id: string } & PostData) => ({
        url: `user/edit-post/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAGS.POSTS, TAGS.USER],
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `user/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAGS.POSTS, TAGS.USER],
    }),
    followUser: builder.mutation({
      query: (id: string) => ({
        url: `user/follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: [TAGS.USER],
    }),
    unFollowUser: builder.mutation({
      query: (id: string) => ({
        url: `user/unfollow/${id}`,
        method: "POST",
      }),
      invalidatesTags: [TAGS.USER],
    }),
    makeAcomment: builder.mutation({
      query: ({
        postId,
        ...commentData
      }: {
        content: string;
        postId: string;
      }) => ({
        url: `user/add-comment/${postId}`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: [TAGS.POST, TAGS.USER, TAGS.COMMENTS],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useMakeAcommentMutation,
} = usersApi;
