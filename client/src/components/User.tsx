/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/services/users";
import { displayErrorMessage } from "@/utils/functions";

import { useState } from "react";
import { fullName } from "@/utils/functions";
import ProfilePhoto from "./ProfilePhoto";
import { useAppSelector } from "@/hooks";

const User = ({
  user,
  isFollowedByAuthUser,
}: {
  user: any;
  isFollowedByAuthUser: boolean;
}) => {
  const authUser = useAppSelector((state) => state.user);
  const userId = user._id.toString();
  const isAuthUser = userId === authUser?.userId;
  const [isFollowed, setIsFollowed] = useState(isFollowedByAuthUser);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();

  const toggleFollowUser = async () => {
    if (userId) {
      try {
        if (!isFollowed) {
          await followUser(userId).unwrap();
          setIsFollowed(true);
        } else {
          await unfollowUser(userId).unwrap();
          setIsFollowed(false);
        }
      } catch (error) {
        displayErrorMessage(error);
      }
    }
  };

  return (
    <div className="flex gap-2 w-full bg-pc3 p-2 py-3 rounded-lg text-black">
      <ProfilePhoto
        img={user?.profile?.image}
        fullname={fullName(user)}
        size="3rem"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="flex flex-col ">
            <p>{fullName(user)}</p>{" "}
            <p className="font-thin">
              @{user?.username}
              <span className="font-semibold">{isAuthUser ? " (you)" : null}</span>
            </p>
          </span>
          {!isAuthUser && (
            <Button
              className="bg-pc4 rounded-primary max-w-28 flex-1"
              onClick={toggleFollowUser}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <p>{user.profile?.bio}</p>
      </div>
    </div>
  );
};

export default User;
