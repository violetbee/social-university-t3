import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import withPopup from "../../../HOC/withPopup";
import { AfterAuthHeaderSection } from "./AuthedUser/TriggerUserPopupProfile";
import { UserProfile } from "./AuthedUser/PoppedUpUserProfile";
// import SearchBarSection from "../Dashboard/SearchBarSection";
import { trpc } from "../../../../utils/trpc";

const dosis = Josefin_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

const Index: FC = () => {
  const { data: session } = useSession();
  const { data: selectedUni } = trpc.user.getUserUniversityById.useQuery(
    undefined,
    {
      enabled: !!session?.user?.id,
    },
  );

  const UserPopup = withPopup(AfterAuthHeaderSection, UserProfile);

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex ${dosis.className} h-[60px] items-center justify-between border-b-[1px] border-[#444]/40 px-6 text-[#222] lg:border-[#444]/10 dark:bg-darkSecondary`}
      >
        <div className="flex h-full items-center gap-5">
          <Link
            href={"/"}
            className="relative flex cursor-pointer items-center pt-2 text-xl tracking-tighter text-darkSecondary lg:text-3xl/10 dark:text-white"
          >
            SOSYAL<span className="font-bold">ÜNİVERSİTE</span>
          </Link>
          {session && (
            <>
              <div className="h-1/2 w-[1px] rounded-full bg-gradient-to-t from-darkSecondary via-darkPrimary/40 to-darkSecondary" />
              <div className="flex items-center gap-2 text-white">
                <Image
                  src={`/images/${selectedUni?.university?.logo}`}
                  alt="logo"
                  width={50}
                  height={50}
                  className="h-10 w-10"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {selectedUni?.university?.name}
                  </span>
                  <p className="text-xs font-thin text-whitish/30">
                    Kalan gezme hakkınız: 3
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hidden h-full lg:flex">
          {session ? (
            <div className="flex items-center">
              <div className="flex h-full items-center">
                <UserPopup />
              </div>
            </div>
          ) : (
            <ul className="flex items-center gap-2 font-bold tracking-wide">
              <Link
                href={"/auth"}
                className="inline-flex w-32 items-center px-6 py-2 text-white"
              >
                <span className="mx-auto">Giriş Yap</span>
              </Link>
              <Link
                href={"/auth"}
                className="inline-flex w-32 items-center rounded border border-whitish/20 bg-darkBackground px-6 py-2 text-white shadow-md"
              >
                <span className="mx-auto">Üye Ol</span>
              </Link>
            </ul>
          )}
        </div>
        <div className="flex items-center lg:hidden">
          <button className="mobile-menu-button outline-none">
            <svg
              className="h-6 w-6 text-gray-500 hover:text-gray-600 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Index;
