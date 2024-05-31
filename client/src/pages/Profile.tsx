import { Button } from "@/components/ui/button";
import { FaUserEdit } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfilePhoto from "@/components/ProfilePhoto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsView from "@/components/PostsView";
import UsersView from "@/components/UsersView";
import {
  useFollowUserMutation,
  useGetUserDetailsQuery,
  useUnFollowUserMutation,
} from "@/services/users";
import {
  displayErrorMessage,
  fullName,
  numberFormatter,
} from "@/utils/functions";
import Loader from "@/components/Loader";
import { useParams } from "react-router-dom";
import ErrorMsg from "@/components/ErrorMsg";
import { useAppSelector } from "@/hooks";
import { useRef, useState } from "react";
// import { useAppSelector } from "@/hooks";

const Profile = () => {
  const userId = useParams().id;
  const authUser = useAppSelector((state) => state.user);
  const { currentData: userData, isFetching: userDetailsLoading } =
    useGetUserDetailsQuery(userId, { refetchOnMountOrArgChange: true });
  const userDetails = userData?.data;
  // const [deviceHeight, setDeviceHeight] = useState(0);
  const [isFollowed, setIsFollowed] = useState(
    userDetails?.profile?.followers?.includes(authUser?.userId)
  );
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnFollowUserMutation();
  const isAuthUser = !userId || (userId && (userId === authUser?.userId));
  console.log({ isAuthUser, userId, authUser });

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

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const tabsContentHeight = tabsContainerRef.current?.offsetHeight;

  console.log({ tabsContentHeight, tabsContainerRef });

  return (
    <div className="h-full flex flex-col gap-2 bg-pc1 overflow-hidden">
      {/* <header className="flex justify-between items-center px-3 pt-3">
        <h2 className="text-lg font-semibold">User Profile</h2>
        {userDetails && isAuthUser && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <Button className="rounded-full h-8 w-8 p-2 bg-pc2">
                  <FaUserEdit size={".85rem"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Edit profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </header> */}
      {userDetailsLoading ? (
        <Loader />
      ) : !userDetails ? (
        <ErrorMsg message="We couldn't find this user" />
      ) : (
        <div className="flex flex-col gap-3 flex-1 mt-10 bg-background rounded-t-primary overflow-hidden">
          <div className="flex items-center justify-evenly gap-x-20 pt-2 text-sm h-20">
            <span className="flex flex-col gap-2 items-center">
              <p className="font-bold">
                {numberFormatter(userDetails?.profile?.followers?.length)}
              </p>{" "}
              <p>Followers</p>
            </span>
            <span className="rounded-full translate-y-[-2rem] absolute z-20">
              <ProfilePhoto
                img={userDetails?.profile?.image}
                fullname={fullName(userDetails)}
                size="4rem"
              />
            </span>
            <span className="flex flex-col gap-2 items-center">
              <p className="font-bold">
                {numberFormatter(userDetails?.profile?.following?.length)}
              </p>{" "}
              <p>Following</p>
            </span>
          </div>
          <p className="w-full text-center mt-[-2rem] font-bold text-lg">
            @{userDetails?.username}
          </p>
          <p className="w-full text-center text-pc2">Bio</p>
          {!isAuthUser && (
            <div className="flex items-center gap-5 justify-center">
              <Button
                className="bg-pc4 rounded-primary max-w-28 flex-1"
                onClick={toggleFollowUser}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
              <Button className="bg-white text-black max-w-28 flex-1 rounded-primary">
                Message
              </Button>
            </div>
          )}
          <Tabs
            orientation="vertical"
            defaultValue="posts"
            className="flex-1 w-full flex flex-col overflow-hidden"
          >
            <TabsList className="bg-transparent w-full">
              <TabsTrigger value="posts" className="tabs-trigger">
                Posts
              </TabsTrigger>
              <TabsTrigger value="likes" className="tabs-trigger">
                Likes
              </TabsTrigger>
              <TabsTrigger value="followers" className="tabs-trigger">
                Followers
              </TabsTrigger>
              <TabsTrigger value="following" className="tabs-trigger">
                Following
              </TabsTrigger>
            </TabsList>
            <div
              className="flex-1 flex-col flex overflow-hidden w-full"
              ref={tabsContainerRef}
            >
              <TabsContent
                value="posts"
                className="tabs-content"
                style={{ maxHeight: tabsContentHeight }}
              >
                <PostsView
                  showPostUser={false}
                  posts={userDetails?.profile.posts}
                  postsLoading={userDetailsLoading}
                />
              </TabsContent>
              <TabsContent value="likes" className="tabs-content">
                <PostsView
                  errMsg="You haven't liked any posts"
                  posts={userDetails?.profile.likes}
                  postsLoading={userDetailsLoading}
                  showPostUser={!isAuthUser}
                />
              </TabsContent>
              <TabsContent value="followers" className="tabs-content">
                <UsersView
                  authUserFollowing={userDetails?.profile.following}
                  users={userDetails?.profile.followers}
                  usersLoading={userDetailsLoading}
                  errMsg="You have no followers"
                />
              </TabsContent>
              <TabsContent value="following" className="tabs-content">
                <UsersView
                  users={userDetails?.profile?.following}
                  authUserFollowing={userDetails?.profile.following}
                  usersLoading={userDetailsLoading}
                  errMsg="Not following anyone yet"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Profile;
