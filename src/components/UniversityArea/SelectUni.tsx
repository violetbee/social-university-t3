import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useDebounce } from "../../hooks/useDebounce";

type University = {
  id: string;
  name: string;
  slug: string;
  location: string;
  logo: string;
  _count: {
    users: number;
  };
};

export default function SelectUni() {
  const [uniName, setUniName] = useState("");

  const isValueDebounced = useDebounce(uniName, 500);

  const { data: university, isLoading } = trpc.university.getAll.useQuery<
    University[]
  >(
    {
      universityName: uniName,
    },
    {
      enabled: isValueDebounced,
    },
  );
  const { mutateAsync: setUserUniversity } =
    trpc.university.changeUserUniversity.useMutation();
  const universityCtx = trpc.useContext();

  return (
    <div className="flex min-w-[500px] flex-col items-center justify-center gap-10 rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-darkHelper dark:bg-darkSecondary dark:shadow-md">
      <div className="grid w-full grid-cols-1 gap-3 [&>*:nth-child(1)]:shadow-sm [&>*:nth-child(1)]:shadow-indigo-500 [&>*:nth-child(2)]:shadow-sm [&>*:nth-child(2)]:shadow-rose-500 [&>*:nth-child(3)]:shadow-sm [&>*:nth-child(3)]:shadow-emerald-800">
        {isValueDebounced &&
          !isLoading &&
          university
            ?.sort((prev, next) => next._count.users - prev._count.users)
            .map((uni) => (
              <button
                key={uni.id}
                onClick={() => {
                  setUserUniversity(
                    {
                      universityId: uni.id,
                    },
                    {
                      onSuccess: () => {
                        universityCtx.user.invalidate();
                      },
                    },
                  );
                }}
                className={`col-span-1 flex h-10 w-full items-center justify-between rounded-md border px-2 py-1 font-medium duration-150 hover:hue-rotate-30 dark:border-darkHelper dark:shadow-md`}
              >
                <span>{uni.name}</span>
                <small>{uni._count.users} Öğrenci Mevcut</small>
              </button>
            ))}

        {(isLoading || !isValueDebounced) && (
          <div className="mx-auto flex h-24 w-24 animate-waving-hand items-center justify-center self-center rounded-full border border-darkHelper bg-darkBackground !shadow-none">
            <div className="flex items-center justify-center gap-2">
              <div className="animation-delay-100 h-4 w-4 animate-bounce rounded-full bg-gray-300"></div>
              <div className="animation-delay-200 h-4 w-4 animate-bounce rounded-full bg-gray-300 delay-300"></div>
              <div className="animation-delay-300 h-4 w-4 animate-bounce rounded-full bg-gray-300"></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <input
          type="text"
          className="rounded-sm border-b border-black/20 px-2 py-1 outline-none dark:bg-darkBackground"
          placeholder="Üniversite Ara"
          onChange={(e) => {
            setUniName(e.target.value);
          }}
        />
        <div className="flex flex-1 flex-col items-end gap-1 text-end font-medium">
          <span className="lowercase text-[#333] dark:text-white">
            Hemen Diğer Üniversiteleri
          </span>
          <span className="rotate-[-5deg] skew-x-[3deg] bg-gradient-to-r from-indigo-600 to-orange-700 px-1 text-2xl font-bold tracking-wider text-white ">
            KEŞFET!
          </span>
        </div>
      </div>
    </div>
  );
}
