/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePhoto = ({
  img,
  size="2.5rem",
  fullname,
}: {
  img: string;
  size?: string;
  fullname?: string;
}) => {
  const names = fullname?.split(" ") || "U";
  const fallback = names[0][0] + names?.[1][0];
  return (
    <Avatar style={{width:size, height:size}}>
      <AvatarImage  src={img} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePhoto;
