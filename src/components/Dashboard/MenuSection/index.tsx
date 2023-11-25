import Link from "next/link";
import { ShareButton } from "../SearchBarSection/particles/ShareButton";
import PublishPostSection from "../PublishPostSection";
import { useRouter } from "next/router";

const MenuSection = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex w-full justify-between gap-4">
        <div className="relative flex max-w-full gap-4 overflow-x-hidden">
          <div className="absolute right-0 top-0 block h-full w-10 bg-gradient-to-r from-transparent to-darkBackground 2.5xl:hidden" />
          <Link
            href="/dashboard"
            className={`${
              router.asPath === "/dashboard"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Her Şey
            </span>
          </Link>
          <Link
            href="/sub/gonderiler"
            className={`${
              router.asPath === "/sub/gonderiler"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Gönderiler
            </span>
          </Link>
          <Link
            href="/sub/dosya-paylasimlari"
            className={`${
              router.asPath === "/sub/dosya-paylasimlari"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Dosya Paylaşımları
            </span>
          </Link>
          <Link
            href="/sub/soru-cevap-paylasimlari"
            className={`${
              router.asPath === "/sub/soru-cevap-paylasimlari"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Soru-Cevap Paylaşımları
            </span>
          </Link>
          <Link
            href="/sub/anketler"
            className={`${
              router.asPath === "/sub/anketler"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Anketler
            </span>
          </Link>
          <Link
            href="/sub/etkinlikler"
            className={`${
              router.asPath === "/sub/etkinlikler"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Etkinlikler
            </span>
          </Link>
          <Link
            href="/sub/okul-kulupleri"
            className={`${
              router.asPath === "/sub/okul-kulupleri"
                ? "border-darkPrimary"
                : "border-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-base font-normal tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
              Okul Kulüpleri
            </span>
          </Link>
          <Link
            href="/sub/ilanlar"
            className={`${
              router.asPath === "/sub/ilanlar"
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
    </div>
  );
};

export default MenuSection;
