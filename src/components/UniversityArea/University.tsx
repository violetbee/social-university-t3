import { trpc } from "../../utils/trpc";
import withPopup from "../HOC/withPopup";
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
        className="w-1/3 rounded-md border border-darkHelper bg-darkBackground px-4 py-1 text-white duration-150 hover:bg-white hover:text-darkBackground"
      >
        Tıkla ve Gez
      </button>
    ),
    SelectUni,
  );

  return (
    <div className="flex h-full flex-row items-center justify-center gap-4 md:flex-col xl:flex-row">
      <Image
        src={`/images/${selectedUni?.university?.logo}`}
        width={200}
        height={200}
        alt="Üniversite"
        className="h-14 w-14 rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">
          {selectedUni?.university?.name}
        </span>
        <p className="text-sm font-thin text-whitish/30">
          Kalan gezme hakkınız: 3
        </p>
      </div>
      <DisplaySelectUniversity />
    </div>
  );
};

export default University;
