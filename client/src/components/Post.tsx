import ProfilePhoto from "./ProfilePhoto";
import { displayErrorMessage, fullName } from "@/utils/functions";
import { BsHearts } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa6";
import { useLikePostMutation, useUnlikePostMutation } from "@/services/posts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaShareAltSquare } from "react-icons/fa";
import { useAppSelector } from "@/hooks";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import { useDeletePostMutation } from "@/services/users";
import toast from "react-hot-toast";

const Post = ({
  post,
  showUser = true,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  showUser?: boolean;
}) => {
  const postId = post?._id?.toString();
  const postUserId = post?.user?._id?.toString();
  const authUser = useAppSelector((state) => state.user);
  const isAuthUser = postUserId === authUser?.userId;
  const navigate = useNavigate();
  const postLikeUsers = post?.likes;
  const [noLikedUsers, setNoLikedUsers] = useState(postLikeUsers?.length || 0);
  const [isLiked, setIsLiked] = useState(
    postLikeUsers?.includes(authUser?.userId)
  );
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [deleteAPost, { isLoading: deletingPost }] = useDeletePostMutation();

  const toggleLikePost = async () => {
    try {
      if (!isLiked) {
        await likePost(postId).unwrap();
        setIsLiked(true);
        setNoLikedUsers((prev) => prev + 1);
      } else {
        await unlikePost(postId).unwrap();
        setIsLiked(false);
        setNoLikedUsers((prev) => prev - 1);
      }
    } catch (error) {
      displayErrorMessage(error);
    }
  };

  const deletePost = async () => {
    if (deletingPost) return;
    const toastId = toast.loading("Deleting post");
    try {
      await deleteAPost(postId).unwrap();
      toast.success("You just deleted a post");
    } catch (error) {
      displayErrorMessage(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="rounded-[2rem] h-max bg-pc1 flex flex-col gap-4 pt-4 shadow-[rgba(67,_71,_85,_0.27)_0px_0px_0.25em,_rgba(90,_125,_188,_0.05)_0px_0.25em_1em] hover:cursor-pointer">
      {showUser && (
        <header className="flex gap-4 px-4">
          <ProfilePhoto
            size="2.5rem"
            img={post?.user?.profile?.image}
            fullname={fullName(post?.user)}
          />
          <p className="flex flex-col gap-1">
            <span className="font-bold">{fullName(post?.user)}</span>
            <span
              className="font-thin hover:underline"
              onClick={() => {
                navigate(isAuthUser ? `/profile` : `/profile/${postUserId}`);
              }}
            >
              @{post?.user.username}
            </span>
          </p>
        </header>
      )}
      <div className="px-4 flex flex-col gap-2">
        <p>{post?.content}</p>
        {post?.media && (
          <img
            className="max-h-60 object-contain"
            src={post?.media.url}
            alt=""
          />
        )}
      </div>
      <footer className="rounded-b-[1.9rem] bg-pc2 backdrop-blur-3xl flex justify-between items-center px-5 py-2 text-pc3">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <FaCommentDots />0
          </span>
          <span className="flex items-center gap-1" onClick={toggleLikePost}>
            <BsHearts className={isLiked ? `fill-red-700` : ""} />
            {noLikedUsers}
          </span>
        </div>
        <span className="flex items-center gap-4">
          {!showUser ? (
            <>
              <MdDelete onClick={deletePost} />
              <Drawer>
                <DrawerTrigger>
                  <FaEdit />
                </DrawerTrigger>
              </Drawer>
            </>
          ) : (
            <FaShareAltSquare />
          )}
        </span>
      </footer>
    </div>
  );
};

export default Post;
