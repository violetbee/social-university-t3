import { useEffect, useState } from "react";
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

  const DisplaySelectUniversity = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      setCount(count + 1);
    }, []);

    return <div>{count}</div>;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-[#333]">
      <div className="flex w-full items-center gap-2 px-3">
        <div>
          <p className="text-center text-xl font-medium text-[#333]">
            {selectedUni?.university?.name}
          </p>

          <input
            type="text"
            value={uniName}
            onChange={(e) => setUniName(e.target.value)}
          />
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
