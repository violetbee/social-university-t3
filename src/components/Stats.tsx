import { AiOutlineFile, AiOutlineHeart } from "react-icons/ai";

const Stats = () => {
  return (
    <div className="flex w-full rounded-lg border-t-4 border-cyan-600 bg-box text-white shadow-sm">
      <div className="flex h-full w-1/3 justify-between border-r-[1px] border-accent px-5 py-4">
        <div className="flex flex-col gap-1">
          <p className="">Toplam Beğeni</p>
          <div>
            <p className="text-2xl font-bold text-[#00b4d8] md:text-3xl lg:text-5xl">
              25.6K
            </p>
            <p className="/80 hidden text-sm sm-m:block">
              geçen aydan %21 daha fazla
            </p>
          </div>
        </div>
        <div className="hidden items-center lg:flex">
          <AiOutlineHeart color={"#00b4d8"} size="40" />
        </div>
      </div>
      <div className="flex h-full w-1/3 justify-between border-r-[1px] border-accent px-5 py-4">
        <div className="flex flex-col justify-between gap-1">
          <p>Doküman Sayısı</p>
          <div>
            <p className="text-2xl font-bold text-[#D926A9] md:text-3xl lg:text-5xl ">
              245
            </p>
            <p className="/80 hidden text-sm sm-m:block">
              yüklenen toplam doküman sayısı
            </p>
          </div>
        </div>
        <div className="hidden items-center lg:flex">
          <AiOutlineFile size="40" color={"#D926A9"} />
        </div>
      </div>
      <div className="flex h-full w-1/3 justify-between rounded-r-lg bg-gradient-to-tr from-yellow-500/60 via-orange-500/60 to-yellow-500/60">
        <div className="flex h-full w-full flex-col justify-between rounded-r-lg bg-box px-5 py-4 md:flex-row">
          <div className="flex flex-col justify-between gap-1">
            <p>Ayın Üyesi</p>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-[#f04c47] md:text-3xl lg:text-4xl">
                Çağlar
              </p>
              <p className="/80 hidden text-sm sm-m:block">
                en çok beğeni alan kullanıcı
              </p>
            </div>
          </div>
          <div className="hidden flex-shrink-0 items-center lg:flex">
            <img
              alt="avatar"
              className="mask mask-heart h-20 w-20"
              src="https://placeimg.com/192/192/people"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Stats;
