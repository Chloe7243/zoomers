import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGetPostLikesQuery } from "@/services/posts";
import UsersView from "./UsersView";

const PostLikes = ({ postId }: { postId: string }) => {
  const { currentData, isLoading } = useGetPostLikesQuery(postId);

  return (
    <DrawerContent className=" top-0 px-3 !rounded-t-primary !h-[calc(100%_-_4rem)] mt-16">
      <DrawerHeader>
        <DrawerTitle>Liked by</DrawerTitle>
      </DrawerHeader>
      <div className="h-full  gap-2">
        <UsersView
          usersLoading={isLoading}
          users={currentData?.data || []}
          errMsg="Be the first to like"
        />
      </div>
    </DrawerContent>
  );
};

export default PostLikes;
