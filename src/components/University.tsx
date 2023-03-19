import { trpc } from "../utils/trpc";
import withPopup from "./HoC/withPopup";

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
        className="flex h-full items-center border-x-2 border-dashed bg-[#dd4e63] bg-opacity-20 px-4 pt-1 duration-200 hover:bg-opacity-60"
      >
        Üniversitemi Değiştir
      </button>
    ),
    () => (
      <div className="flex w-96 flex-col  items-center justify-center gap-2 space-y-1 rounded-md border-2 border-black bg-white p-2 shadow-lg">
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
    <div className="uniSelect flex h-10 items-center justify-center gap-10 text-white">
      <p className="text-lg tracking-widest">{selectedUni?.university?.name}</p>
      <DisplaySelectUniversity />
    </div>
  );
};

export default University;
