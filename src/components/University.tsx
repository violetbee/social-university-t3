import { trpc } from "../utils/trpc";
import withPopup from "./HoC/withPopup";
import Image from "next/dist/client/image";

const University = () => {
  const { data: university } = trpc.university.getAll.useQuery();
  const { data: selectedUni } = trpc.user.getUserUniversityById.useQuery();
  const { mutateAsync: setUserUniversity } =
    trpc.university.changeUserUniversity.useMutation();

  const universityCtx = trpc.useContext();

  const DisplaySelectUniversity = withPopup(
    ({ setOpen }: { setOpen: () => void }) => (
      <button
        onClick={() => {
          setOpen();
        }}
        className="flex items-center border-x-2 border-dashed bg-[#222] bg-opacity-20 px-4 pb-1 pt-2 leading-none hover:bg-opacity-80 hover:text-white"
      >
        Üniversitemi Değiştir
      </button>
    ),
    () => (
      <div className="flex flex-col items-center justify-center gap-2 space-y-1 rounded-md border-2 border-black bg-white p-2 shadow-lg">
        <input
          type="text"
          className="w-11/12 border-b-2 border-black py-1 outline-none"
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
                  }
                );
              }}
              className="flex h-10 w-full items-center justify-between rounded-md border-2 border-black px-2 py-1 hover:bg-[#dd4e63] hover:bg-opacity-20"
            >
              <p>{uni.name}</p>
            </button>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-[#333]">
      <div className="flex w-full items-center justify-start gap-2 px-3">
        <Image
          src="/images/samu.png"
          className="h-[50px] w-[50px] rounded-full object-cover"
          alt=""
          width={50}
          height={50}
        />
        <div>
          <p className="text-center text-sm font-medium text-[#333]">
            {selectedUni?.university?.name}
          </p>
          <DisplaySelectUniversity />
        </div>
      </div>
    </div>
  );
};

export default University;
