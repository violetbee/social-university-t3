import { useSession } from "next-auth/react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { BiSolidUser } from "react-icons/bi";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AfterAuthHeaderSection = ({ setOpen }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex items-center justify-center text-[#333] dark:text-white">
        {session?.user?.name}
      </div>
      {session?.user?.image ? (
        <Image
          src={session.user?.image}
          alt="User Image"
          width={40}
          height={40}
          className="mr-2 h-10 w-10 rounded-full"
        />
      ) : (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-m flex h-8 w-8 items-center justify-center"
        >
          {/* user profile svg */}
          <BiSolidUser className="text-[#333] dark:text-white" />
        </button>
      )}
    </div>
  );
};
