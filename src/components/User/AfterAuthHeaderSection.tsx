import { useSession } from "next-auth/react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AfterAuthHeaderSection = ({ setOpen }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex items-center justify-center">
        {session?.user?.name}
        {" Karahüseyin"}
      </div>
      {session?.user?.image ? (
        <Image
          src={session.user?.image}
          alt="User Image"
          width={100}
          height={100}
          className="w-full"
        />
      ) : (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="mr-5 flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-200 active:bg-gray-300"
        >
          {/* user profile svg */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.36 21C18.3733 19.7267 17.08 19 16 19H8C6.92 19 5.62667 19.7267 4.64 21"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
