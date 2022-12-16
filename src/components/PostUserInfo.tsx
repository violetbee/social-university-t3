import { ProfileInfos } from "./PostUserInfo/ProfileInfos";
import { UserAwards } from "./PostUserInfo/UserAwards";
import { UserEduInfos } from "./PostUserInfo/UserEduInfos";
import { UserMood } from "./PostUserInfo/UserMood";

const lookupTable = {
  profileInfos: ProfileInfos,
  userMood: UserMood,
  userEduInfos: UserEduInfos,
  userAwards: UserAwards,
} as const;

const PostUserInfo = ({ menu }: { menu: JSX.Element }) => {
  const Component = lookupTable[menu];
  return <Component />;
};
