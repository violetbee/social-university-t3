import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Pagination from "../../../ui/pagination";
import { usePagination } from "../../../../hooks/usePagination";

const NUMBER_OF_SURVEYS_RECEIVED = 9;

function Anketler() {
  const pagination = usePagination(NUMBER_OF_SURVEYS_RECEIVED, 9);
  return (
    <div className="grid grid-cols-10 items-start gap-6">
      <div className="relative col-span-2 flex flex-col gap-2 rounded-md border border-darkHelper bg-darkSecondary p-3">
        <div className="flex items-center">
          <span className="flex gap-2 rounded-md text-sm">
            <Image
              src={"/images/avatar-male.svg"}
              className="h-8 w-auto rounded-full object-cover"
              alt={"default profile image"}
              width={64}
              height={64}
            />
            <button className="mt-1 flex flex-col items-start text-sm/4">
              <span>{`@Violetbee`}</span>
              <span className="text-xs font-extralight text-whitish/60">
                {"Çağlar Karahüseyin"} (3. Sınıf)
              </span>
            </button>
          </span>
          <div className="ml-auto">
            <span className="block size-4 rounded-full border-2 border-white/30 bg-green-500"></span>
          </div>
        </div>
        <span className="h-[1px] w-full rounded-full bg-darkHelper/50" />

        <h3 className="font-medium">Anket başlığı</h3>
        <p className="text-sm font-extralight">
          Anket açıklaması ama kısaca bir açıklamadır. Lorem ipsum dolor sit
          amet.
        </p>
        <span className="h-[1px] w-full rounded-full bg-darkHelper/50" />
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="name"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              name="deneme"
              id="name"
              value="Çağlar"
              className="peer hidden"
            />
            <div className="flex size-4 select-none items-center justify-center rounded-md bg-white peer-checked:outline peer-checked:outline-1 peer-checked:outline-offset-2 peer-checked:outline-blue-400" />
            <span className="pt-1">Cevap şıkkı 1</span>
          </label>
          <label
            htmlFor="surname"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              name="deneme"
              id="surname"
              value="KARAHÜSEYİN"
              className="peer hidden"
            />
            <div className="flex size-4 select-none items-center justify-center rounded-md bg-white peer-checked:outline peer-checked:outline-1 peer-checked:outline-offset-2 peer-checked:outline-blue-400">
              <FaCheck color="green" size={12} />
            </div>
            <span className="pt-1">Cevap şıkkı 2</span>
          </label>
          <label
            htmlFor="age"
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              name="deneme"
              id="age"
              value="28"
              className="peer hidden"
            />
            <div className="flex size-4 select-none items-center justify-center rounded-md bg-white peer-checked:outline peer-checked:outline-1 peer-checked:outline-offset-2 peer-checked:outline-blue-400" />
            <span className="pt-1">Cevap şıkkı 3</span>
          </label>
        </div>
        <button className="mt-2 rounded-md border border-darkHelper bg-darkPrimary py-2 duration-150 hover:bg-darkPrimary/80">
          Oyla
        </button>
      </div>
      <div className="relative col-span-2 flex flex-col gap-2 rounded-md border border-darkHelper bg-darkSecondary p-3">
        <div className="flex items-center">
          <span className="flex gap-2 rounded-md text-sm">
            <Image
              src={"/images/avatar-male.svg"}
              className="h-8 w-auto rounded-full object-cover"
              alt={"default profile image"}
              width={64}
              height={64}
            />
            <button className="mt-1 flex flex-col items-start text-sm/4">
              <span>{`@Violetbee`}</span>
              <span className="text-xs font-extralight text-whitish/60">
                {"Çağlar Karahüseyin"} (4. Sınıf)
              </span>
            </button>
          </span>
          <div className="ml-auto">
            <span className="block size-4 rounded-full border-2 border-white/30 bg-red-500"></span>
          </div>
        </div>
        <span className="h-[1px] w-full rounded-full bg-darkHelper/50" />

        <h3 className="font-medium">Anket başlığı</h3>
        <p className="text-sm font-extralight">
          Anket açıklaması ama kısaca bir açıklamadır. Lorem ipsum dolor sit
          amet.
        </p>
        <span className="h-[1px] w-full rounded-full bg-darkHelper/50" />
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="name2" className="flex w-full items-center gap-2">
            <input
              type="radio"
              name="deneme2"
              id="name2"
              value="Çağlar"
              className="peer hidden"
              disabled
            />
            <div className="flex size-4 shrink-0 select-none items-center justify-center rounded-md bg-white opacity-20 peer-checked:outline peer-checked:outline-1 peer-checked:outline-offset-2 peer-checked:outline-blue-400" />
            <div className="my-[6px] flex size-4 w-full gap-2 rounded-lg border border-white/30">
              <span className="h-full w-1/2 rounded-md bg-darkPrimary" />
              <span className="flex-1 text-xs">15 Kişi Katıldı</span>
            </div>
          </label>
          <label htmlFor="name2" className="flex w-full items-center gap-2">
            <input
              type="radio"
              name="deneme2"
              id="name2"
              value="Çağlar"
              className="peer hidden"
              disabled
            />
            <div className="flex size-4 shrink-0 select-none items-center justify-center rounded-md bg-white opacity-20 peer-checked:outline peer-checked:outline-1 peer-checked:outline-offset-2 peer-checked:outline-blue-400" />
            <div className="my-[6px] flex size-4 w-full gap-2 rounded-lg border border-white/30">
              <span className="h-full w-1/3 rounded-md bg-darkPrimary" />
              <span className="flex-1 text-xs">7 Kişi Katıldı</span>
            </div>
          </label>
          <label htmlFor="name2" className="flex w-full items-center gap-2">
            <input
              type="radio"
              name="deneme2"
              id="name2"
              value="Çağlar"
              className="peer hidden"
              disabled
            />
            <div className="flex size-4 shrink-0 select-none items-center justify-center rounded-md bg-white opacity-20 peer-checked:outline peer-checked:outline-1 peer-checked:outline-offset-2 peer-checked:outline-blue-400" />
            <div className="my-[6px] flex size-4 w-full gap-2 rounded-lg border border-white/30">
              <span className="h-full w-1/6 rounded-md bg-darkPrimary" />
              <span className="flex-1 text-xs">4 Kişi Katıldı</span>
            </div>
          </label>
        </div>
        <button
          disabled
          className="mt-2 rounded-md border border-darkHelper bg-darkPrimary py-2 duration-150 hover:bg-darkPrimary/80 disabled:bg-darkBackground"
        >
          Artık Aktif Değil
        </button>
      </div>
      <div className="col-span-12 mt-8 justify-self-center">
        <Pagination {...pagination} />
      </div>
    </div>
  );
}

export default Anketler;
