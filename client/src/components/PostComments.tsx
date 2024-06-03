import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGetPostCommentsQuery } from "@/services/posts";
import { Textarea } from "./ui/textarea";
import { FaArrowUp } from "react-icons/fa6";
import { useState } from "react";
import { useMakeAcommentMutation } from "@/services/users";
import toast from "react-hot-toast";
import { displayErrorMessage } from "@/utils/functions";
import CommentsView from "./CommentsView";

const PostComments = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");
  const [postComment, { isLoading: postingComment }] =
    useMakeAcommentMutation();
  const { currentData, isLoading } = useGetPostCommentsQuery(postId);

  const makeAcomment = async () => {
    if (postingComment) return;
    try {
      await postComment({ postId, content: comment }).unwrap();
      toast.success("You just made a comment!");
      setComment("");
    } catch (error) {
      displayErrorMessage(error);
    }
  };

  return (
    <DrawerContent className=" top-0 px-3 pb-3 !rounded-t-primary !h-[calc(100%_-_4rem)] mt-16 flex flex-col">
      <DrawerHeader>
        <DrawerTitle>Comments</DrawerTitle>
      </DrawerHeader>
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        <CommentsView
          commentsLoading={isLoading}
          comments={currentData?.data || []}
          errMsg="No comments yet"
        />
        <div className="h-max relative">
          <Textarea
            className="resize-none !min-h-2 max-h-24 pr-4"
            placeholder="Any Comment?"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          {comment ? (
            <span
              className="absolute top-0 px-3 right-0 bg-pc1 rounded-md h-full flex items-center justify-center"
              onClick={makeAcomment}
            >
              <FaArrowUp className="" />
            </span>
          ) : null}
        </div>
      </div>
    </DrawerContent>
  );
};

export default PostComments;
