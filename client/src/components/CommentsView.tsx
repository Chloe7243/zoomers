import ErrorMsg from "./ErrorMsg";
import Comment from "./Comment";
import Loader from "./Loader";

const CommentsView = ({
  comments,
  errMsg,
  commentsLoading,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[];
  errMsg?: string;
  showPostUser?: boolean;
  commentsLoading?: boolean;
  showAdminActions?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-8 flex-1 p-4 overflow-y-auto w-full">
      {commentsLoading ? (
        <Loader />
      ) : !comments || !comments.length ? (
        <ErrorMsg message={errMsg || "No comments yet"} />
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        comments.map((comment: any) => (
          <Comment key={comment._id.toString()} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentsView;
