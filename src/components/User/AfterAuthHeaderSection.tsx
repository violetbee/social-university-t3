import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AfterAuthHeaderSection = ({ setOpen }: Props) => {
  const { data: session } = useSession();

  return (
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="flex h-full items-center justify-center border-l-[1px] border-[#333]/10 pl-2"
    >
      <div className="flex h-full w-44 items-center justify-center ">
        {session?.user?.name}
        {" karahüseyin"}
      </div>
      {session?.user?.image ? (
        <Image
          src={session.user?.image}
          alt="User Image"
          width={100}
          height={100}
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-4">
          <HiOutlineUserCircle className=" text-5xl text-[#333]" />
        </div>
      )}
    </button>
  );
};
