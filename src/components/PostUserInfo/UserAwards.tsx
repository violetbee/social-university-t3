import { FC } from "react";
import { PostUserBar } from "../../types/app";

export const UserAwards: FC<PostUserBar> = ({ setIsMenuOpen }) => {
  return (
    <div
      onClick={() => {
        setIsMenuOpen(false);
      }}
    >
      User Awards
    </div>
  );
};
