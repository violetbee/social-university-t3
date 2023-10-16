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
        className="w-24 rounded-md border border-darkHelper bg-darkBackground px-4 py-1 text-white duration-150 hover:bg-white hover:text-darkBackground"
      >
        Tıkla ve Gez
      </button>
    ),
    SelectUni,
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-4">
        <Image
          src="/images/samu.png"
          width={200}
          height={200}
          alt="Üniversite"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">
            {selectedUni?.university?.name}
          </span>
          <p className="text-sm text-whitish/30">
            Kalan gezme hakkınız: {selectedUni?.university?.dailyLimit || 3}
          </p>
        </div>
        <DisplaySelectUniversity />
      </div>
    </div>
  );
};

export default University;
