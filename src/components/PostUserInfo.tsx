import { ProfileInfos } from "./PostUserInfo/ProfileInfos";
import { UserAwards } from "./PostUserInfo/UserAwards";
import { UserEduInfos } from "./PostUserInfo/UserEduInfos";
import { UserMood } from "./PostUserInfo/UserMood";
import React, { FC } from "react";

type PostUserInfoRecords =
  | "profileInfo"
  | "userMood"
  | "userEduInfo"
  | "userAwards"
  | string
  | "";

type Props = {
  menu: PostUserInfoRecords;
};

const lookupTable: Record<PostUserInfoRecords, React.ComponentType> = {
  profileInfo: ProfileInfos,
  userMood: UserMood,
  userEduInfo: UserEduInfos,
  userAwards: UserAwards,
} as const;

export const PostUserInfo: FC<Props> = ({ menu }) => {
  const Component = lookupTable[menu];
  if (Component === undefined) return null;
  return <Component />;
};
