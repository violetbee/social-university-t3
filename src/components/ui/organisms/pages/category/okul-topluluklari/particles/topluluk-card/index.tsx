import Link from "next/link";
import { PiStar, PiStarFill, PiStarHalfFill } from "react-icons/pi";

type Props = {
  title: string;
  description: string;
  banner: string;
  rating: number;
  numberOfMembers: number;
  id: string;
  route: string;
};

const ToplulukCard = (props: Props) => {
  const { title, description, banner, rating, numberOfMembers, id, route } =
    props;

  console.log(rating);

  return (
    <div className="mt-28 flex w-full flex-col items-center justify-center gap-5 rounded-3xl bg-darkSecondary px-12 pb-12 pt-6">
      <div className="-mt-28 flex w-full flex-col items-center justify-center">
        <img
          src={banner}
          alt={title}
          // width={500}
          // height={300}
          className="h-52 w-full rounded-3xl object-cover"
        />
      </div>

      <div className="flex h-1/2 w-full flex-col items-center justify-center gap-1">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-center text-xs font-light text-whitish">
          {description}
        </p>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex w-full items-center justify-center rounded-lg bg-darkBackground p-4">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              if (index < Math.floor(rating)) {
                return <PiStarFill key={index} className="text-darkPrimary" />;
              }

              if (index === Math.floor(rating) && rating % 1 !== 0) {
                return (
                  <PiStarHalfFill key={index} className="text-darkPrimary" />
                );
              }

              return <PiStar key={index} className="text-darkPrimary" />;
            })}
        </div>
        <div className="flex w-full items-center justify-center rounded-lg bg-darkBackground p-4">
          {numberOfMembers} Katılımcı
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <button
          onClick={() => console.log(id)}
          className="w-full rounded-lg bg-darkBackground p-4 text-white duration-150 hover:bg-[#0d0d11] focus:outline focus:outline-1 focus:outline-darkPrimary"
        >
          Katılma Talebi Gönder
        </button>

        <Link
          href={{
            pathname: `/okul-topluluklari/${route}`,
          }}
          className="w-full rounded-lg bg-darkBackground p-4 text-center text-white duration-150 hover:bg-[#0d0d11] focus:outline focus:outline-1 focus:outline-darkPrimary"
        >
          Topluluk Sayfasına Git
        </Link>
      </div>
    </div>
  );
};

export default ToplulukCard;
