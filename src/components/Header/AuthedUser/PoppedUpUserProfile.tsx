import { signOut } from "next-auth/react";

export const UserProfile = () => {
  return (
    <div className="flex flex-col items-center justify-between rounded-md border-2 border-[#888] bg-white p-4 md:h-[400px] md:w-[550px] lg:h-[550px] lg:w-[700px]">
      <div className="flex flex-1"></div>
      <div className="space-x-2 self-end">
        <button className="rounded-lg border-2 border-[#888] bg-white px-4 py-2 font-medium text-[#333] md:px-9">
          Kaydet
        </button>
        <button
          onClick={() => {
            signOut();
          }}
          className="rounded-lg border-2 border-[#888] bg-black px-4 py-2 font-medium text-white md:px-9"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};
