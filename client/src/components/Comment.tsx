import { fullName } from "@/utils/functions";
import ProfilePhoto from "./ProfilePhoto";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks";

const Comment = ({
  comment,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comment: any;
}) => {
  const commentUserId = comment?.user?._id?.toString();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.user);
  const isAuthUser = commentUserId === authUser?.userId;

  return (
    <div className="flex gap-3 w-full flex-grow">
      <ProfilePhoto
        size="2.5rem"
        img={comment?.user?.profile?.image}
        fullname={fullName(comment?.user)}
      />
      <div className="flex flex-col gap-2">
        <p className="flex gap-3 items-center">
          {" "}
          <span className="font-bold">{fullName(comment?.user)}</span>
          <span
            className="font-thin hover:underline"
            onClick={() => {
              navigate(isAuthUser ? `/profile` : `/profile/${commentUserId}`);
            }}
          >
            @{comment?.user.username}
          </span>
        </p>
        <p className="text-wrap break-all">{comment?.content}</p>
      </div>
    </div>
  );
};

export default Comment;
