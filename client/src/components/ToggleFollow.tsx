import { Button } from "./ui/button";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/services/users";
import { displayErrorMessage } from "@/utils/functions";
import { useState } from "react";
const ToggleFollow = ({
  userId,
  authUserIsFollowing,
}: {
  userId: string;
  authUserIsFollowing: boolean;
}) => {
  const [isFollowed, setIsFollowed] = useState(authUserIsFollowing);
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
    <Button
      className="bg-pc4 rounded-primary max-w-28 flex-1"
      onClick={toggleFollowUser}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default ToggleFollow;
