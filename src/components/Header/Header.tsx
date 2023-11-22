import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
// import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import withPopup from "../HoC/withPopup";
import { AfterAuthHeaderSection } from "./AuthedUser/TriggerUserPopupProfile";
import { UserProfile } from "./AuthedUser/PoppedUpUserProfile";
import SearchBarSection from "../Dashboard/SearchBarSection";

const dosis = Josefin_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

const Header: FC = () => {
  const { data: session } = useSession();

  const UserPopup = withPopup(AfterAuthHeaderSection, UserProfile);

  // const menuItems = [
  //   {
  //     id: 0,
  //     name: "Özellikler",
  //     url: "/",
  //   },
  //   {
  //     id: 1,
  //     name: "Hakkımızda",
  //     url: "/about",
  //   },
  //   {
  //     id: 2,
  //     name: "İletişim",
  //     url: "/contact",
  //   },
  //   {
  //     id: 3,
  //     name: "Şikayet",
  //     url: "/contact",
  //   },
  // ];

  return (
    <>
      <header
        className={`flex ${dosis.className} h-[60px] items-center justify-between border-b-[1px] border-[#444]/40 px-6 text-[#222] dark:bg-darkSecondary lg:border-[#444]/10`}
      >
        <Link
          href={"/"}
          className="relative flex cursor-pointer items-center pt-2 text-xl tracking-tighter text-darkSecondary dark:text-white lg:text-3xl/10"
        >
          {/* <Image
            src={"/images/logo.png"}
            alt="logo"
            width={500}
            height={200}
            className="w-64 md:w-72"
          /> */}
          SOSYAL<span className="font-bold">ÜNİVERSİTE</span>
        </Link>

        <SearchBarSection />

        <div className="hidden h-full lg:flex">
          {session ? (
            <div className="flex items-center">
              <div className="flex h-full items-center">
                <UserPopup />
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="m-3">
                <Link
                  href={"/auth"}
                  className="inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white px-6 py-2 font-bold tracking-wide text-gray-800 shadow-md hover:border-blue-600 hover:bg-blue-500 hover:text-white"
                >
                  <span className="mx-auto">Giriş Yap</span>
                </Link>
              </div>
              <div className="m-3">
                <Link
                  href={"/auth"}
                  className="inline-flex w-32 items-center rounded border-b-2 border-red-500 bg-white px-6 py-2 font-bold tracking-wide text-gray-800 shadow-md hover:border-red-600 hover:bg-red-500 hover:text-white"
                >
                  <span className="mx-auto">Üye Ol</span>
                </Link>
              </div>
            </div>
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

export default Header;
