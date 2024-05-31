import Loader from "@/components/Loader";
import { useGetAllPostsQuery } from "@/services/posts";
import PostsView from "@/components/PostsView";

const Explore = () => {
  const { currentData, isLoading } = useGetAllPostsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="h-full  gap-2">
      {isLoading ? (
        <Loader />
      ) : (
        <PostsView postsLoading={isLoading} posts={currentData?.data || []} />
      )}
    </div>
  );
};

export default Explore;
