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
        className="rounded-xl border bg-gray-100 px-5 py-3 text-2xl duration-150 hover:bg-gray-200/80"
      >
        Üniversitemi Değiştir
      </button>
    ),
    SelectUni,
  );

  return (
    <div className="flex w-full items-center justify-between">
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
        width={100}
        height={100}
      />
    </div>
  );
};

export default University;
