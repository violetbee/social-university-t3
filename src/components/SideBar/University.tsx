import { useState } from "react";
import { trpc } from "../../utils/trpc";
import withPopup from "../HoC/withPopup";
import Image from "next/image";

const University = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [uniName, setUniName] = useState("");
  const { data: university } = trpc.university.getAll.useQuery(
    {
      universityName: uniName,
    },
    {
      enabled: isFetch,
    },
  );
  const { data: selectedUni } = trpc.user.getUserUniversityById.useQuery();
  const { mutateAsync: setUserUniversity } =
    trpc.university.changeUserUniversity.useMutation();
  const universityCtx = trpc.useContext();

  const DisplaySelectUniversity = withPopup(
    ({ setOpen }: { setOpen: () => void }) => (
      <button
        onClick={() => {
          setIsFetch(true);
          setOpen();
        }}
        className="rounded-xl border bg-gray-100 px-5 py-3 text-2xl duration-150 hover:bg-gray-200/80"
      >
        Üniversitemi Değiştir
      </button>
    ),
    () => (
      <div className="flex flex-col items-center justify-center gap-2 space-y-1 rounded-md border-2 border-black bg-white p-2 shadow-lg">
        <input
          type="text"
          className="w-11/12 border-b-2 border-black py-1 outline-none"
          onChange={(e) => {
            setUniName(e.target.value);
          }}
        />

        <div className="flex flex-col gap-1">
          {university?.map((uni) => (
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
              className="flex h-10 w-full items-center justify-between rounded-md border-2 border-black px-2 py-1 hover:bg-[#dd4e63] hover:bg-opacity-20"
            >
              <p>{uni.name}</p>
            </button>
          ))}
        </div>
      </div>
    ),
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-[#333]">
      <div className="flex w-full items-center gap-2 px-3">
        <div>
          <p className="text-center text-xl font-medium text-[#333]">
            {selectedUni?.university?.name}
          </p>
          <DisplaySelectUniversity />
        </div>
        <Image
          src="/images/samu.png"
          className="h-[100px] w-[100px] rounded-full object-cover"
          alt=""
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default University;
