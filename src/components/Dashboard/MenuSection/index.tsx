import Link from "next/link";
import { ShareButton } from "../SearchBarSection/particles/ShareButton";
import PublishPostSection from "../PublishPostSection";
import { useRouter } from "next/router";

const MenuSection = () => {
  const router = useRouter();

  function removeQueries(path: string) {
    return path.split("?")[0];
  }

  return (
    <>
      <div className="flex w-full justify-between gap-4">
        <div className="relative flex max-w-full gap-4 overflow-x-hidden">
          <div className="absolute right-0 top-0 block h-full w-10 bg-gradient-to-r from-transparent to-darkBackground 2.5xl:hidden" />
          <Link
            href="/dashboard"
            className={`${
              removeQueries(router.asPath) === "/dashboard"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Her Şey
            </span>
          </Link>
          <Link
            href="/gonderiler"
            className={`${
              removeQueries(router.asPath) === "/gonderiler"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Gönderiler
            </span>
          </Link>
          <Link
            href="/dosya-paylasimlari"
            className={`${
              removeQueries(router.asPath) === "/dosya-paylasimlari"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Dosya Paylaşımları
            </span>
          </Link>
          {/* <Link
            href="/soru-cevap-paylasimlari"
            className={`${
              removeQueries(router.asPath) === "/soru-cevap-paylasimlari"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Soru-Cevap Paylaşımları
            </span>
          </Link> */}
          <Link
            href="/anketler"
            className={`${
              removeQueries(router.asPath) === "/anketler"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Anketler
            </span>
          </Link>
          <Link
            href="/etkinlikler"
            className={`${
              removeQueries(router.asPath) === "/etkinlikler"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Etkinlikler
            </span>
          </Link>
          <Link
            href="/okul-topluluklari"
            className={`${
              removeQueries(router.asPath) === "/okul-topluluklari"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Topluluklar
            </span>
          </Link>
          <Link
            href="/ilanlar"
            className={`${
              removeQueries(router.asPath) === "/ilanlar"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              İlanlar
            </span>
          </Link>
          {/* {data?.map((category) => (
            <Link
              id={category.slug}
              href={
                category.slug === "her-sey" ? "/dashboard" : `/${category.slug}`
              }
              key={category.id}
              className={`${
                params?.category === category.slug ||
                (params?.category === undefined && category.slug === "her-sey")
                  ? "border-darkPrimary"
                  : "border-darkHelper"
              } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
            >
              <span className="text-center text-lg font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
                {category.name}
              </span>
            </Link>
          ))} */}
        </div>
        <ShareButton />
      </div>
      <PublishPostSection />
    </>
  );
};

export default MenuSection;
