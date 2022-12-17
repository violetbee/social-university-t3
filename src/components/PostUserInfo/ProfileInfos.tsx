import { FC } from "react";
import { PostUserBar } from "../../types/app";
import Image from "next/image";
import { CgUserlane } from "react-icons/cg";
import {
  AiOutlineTwitter,
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

export const ProfileInfos: FC<PostUserBar> = ({ setIsMenuOpen, user }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="avatar h-20 w-20 gap-2">
          {user.image ? (
            <Image
              className="mask mask-squircle rounded-2xl"
              src={user.image as string}
              alt={user.name as string}
              width={150}
              height={150}
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-slate-900 p-3">
              <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-white text-3xl font-black leading-none text-white">
                <CgUserlane />
              </div>
            </div>
          )}
        </div>
        <h3>{`${user.name} ${user.surname || ""}`}</h3>
        <h3>Software Engineer</h3>
      </div>
      <div className="flex w-full">
        <div className="flex w-1/4 items-center justify-center rounded-bl-md bg-[#30c2f2] p-1">
          <AiOutlineTwitter color="white" />
        </div>
        <div className="flex w-1/4 items-center justify-center bg-gradient-to-tr from-[#FFDB7C] via-[#E02879] to-[#A138C8] p-1">
          <AiFillInstagram color="white" />
        </div>
        <div className="flex w-1/4 items-center justify-center bg-[#0274B3] p-1">
          <FaLinkedin color="white" />
        </div>
        <div className="flex w-1/4 items-center justify-center rounded-br-md bg-[#161414] p-1">
          <AiFillGithub color="white" />
        </div>
      </div>
    </div>
  );
};
