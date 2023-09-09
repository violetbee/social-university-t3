import { trpc } from "../../utils/trpc";
import withPopup from "../HoC/withPopup";
import Image from "next/image";
import SelectUni from "./SelectUni";

const University = () => {
  const { data: selectedUni } = trpc.user.getUserUniversityById.useQuery();

  const DisplaySelectUniversity = withPopup(
    ({ setOpen }: { setOpen: () => void }) => (
      <button
        onClick={() => {
          setOpen();
        }}
        className="rounded-xl border bg-gray-100 px-5 py-3 shadow-md duration-150 hover:bg-gray-200/80 dark:border-darkHelper dark:bg-darkSecondary dark:hover:bg-darkBackground"
      >
        Üniversitemi Değiştir
      </button>
    ),
    SelectUni,
  );

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 py-4 ">
      <Image
        src="/images/samu.png"
        className="h-[100px] w-[100px] rounded-full object-cover"
        alt=""
        width={100}
        height={100}
      />

      <p className="text-center text-xl font-medium text-[#333] dark:text-white">
        {selectedUni?.university?.name}
      </p>
      <DisplaySelectUniversity />
    </div>
  );
};

export default University;
