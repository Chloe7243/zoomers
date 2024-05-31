import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import Post from "./Post";

const PostsView = ({
  posts,
  errMsg,
  showPostUser,
  postsLoading,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[];
  errMsg?: string;
  showPostUser?: boolean;
  postsLoading?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-8 flex-1 p-4 overflow-y-auto w-full h-full">
      {postsLoading ? (
        <Loader />
      ) : !posts || !posts.length ? (
        <ErrorMsg message={errMsg || "No posts yet"} />
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        posts.map((post: any, i) => (
          <Post key={i} post={post} showUser={showPostUser} />
        ))
      )}
    </div>
  );
};

export default PostsView;
