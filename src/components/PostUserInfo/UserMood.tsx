import { FC } from "react";
import { PostUserBar } from "../../types/app";

export const UserMood: FC<PostUserBar> = ({ setIsMenuOpen }) => {
  return (
    <div
      onClick={() => {
        setIsMenuOpen(false);
      }}
    >
      deneme
    </div>
  );
};
