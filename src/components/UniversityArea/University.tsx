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
        className="mt-5 self-end rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground"
      >
        Üniversitemi Değiştir
      </button>
    ),
    SelectUni,
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between gap-2 overflow-hidden p-4">
      <Image
        src="/images/samu.png"
        className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full object-cover opacity-20"
        alt=""
        width={160}
        height={160}
      />

      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-whitish">
          Seçili Üniversite
        </span>
        <span className="text-whitish/60">{selectedUni?.university?.name}</span>
      </div>

      <DisplaySelectUniversity />
    </div>
  );
};

export default University;
