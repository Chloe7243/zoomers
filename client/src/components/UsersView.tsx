/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import User from "./User";

const UsersView = ({
  users,
  errMsg,
  usersLoading,
  authUserFollowing,
}: {
  users: any[];
  errMsg?: string;
  usersLoading?: boolean;
  authUserFollowing?: any[];
}) => {
  return (
    <div className="flex flex-col gap-4 flex-1 p-4 overflow-y-auto w-full h-full !max-h-[100%]">
      {usersLoading ? (
        <Loader />
      ) : !users.length ? (
        <ErrorMsg message={errMsg || "No users yet"} />
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        users.map((user: any, i) => {
          const isFollowed =
            authUserFollowing
              ?.map((user) => user._id)
              .includes(user._id.toString()) || false;
          return <User user={user} isFollowedByAuthUser={isFollowed} key={i} />;
        })
      )}
    </div>
  );
};

export default UsersView;
