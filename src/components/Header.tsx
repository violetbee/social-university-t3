import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import SharePost from "./Form/SharePost";
import { Josefin_Sans } from "@next/font/google";
import withPopup from "./HoC/withPopup";
import { AfterAuthHeaderSection } from "./User/AfterAuthHeaderSection";
import { UserProfile } from "./User/UserProfile";
import { useId } from "react";

const dosis = Josefin_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

const Header: FC = () => {
  const id = useId();
  const { data: session } = useSession();

  const UserPopup = withPopup(AfterAuthHeaderSection, UserProfile);

  const menuItems = [
    {
      id: 0,
      name: "Özellikler",
      url: "/",
    },
    {
      id: 1,
      name: "Hakkımızda",
      url: "/about",
    },
    {
      id: 2,
      name: "İletişim",
      url: "/contact",
    },
    {
      id: 3,
      name: "Şikayet",
      url: "/contact",
    },
  ];

  return (
    <>
      <header
        className={`flex ${dosis.className} h-[70px] items-center justify-between border-b-[1px] border-[#444]/40 pl-6 text-[#222] lg:border-[#444]/10`}
      >
        <Link href={"/"} className="relative flex items-center">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={500}
            height={200}
            className="w-64 md:w-80"
          />
        </Link>
        {/* {session && (
            <Popup
              trigger={
                <button
                  onClick={
                    // This button removes users for a while
                    async () => {
                      await removeUsers.mutateAsync();
                    }
                  }
                  className="rounded-lg bg-[#B21EED] px-4 py-2 md:px-9"
                >
                  Gönderi Paylaş
                </button>
              }
              modal
            >
              <SharePost />
            </Popup>
          )} */}
        {/* Menu elemanları; Anasayfa Hakkımızda İletişim */}
        <div className="hidden flex-1 items-center justify-evenly lg:flex">
          <ul className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                href={item.url}
                key={item.id}
                className="group flex h-20 cursor-default items-center justify-center duration-300"
              >
                <p className="text-md cursor-pointer pt-1 font-medium tracking-tighter text-[#666] after:block after:scale-x-0 after:border-b-[2px] after:border-[#333] after:transition-transform after:content-[''] hover:text-[#333] hover:after:origin-[0%_100%] hover:after:scale-x-100">
                  {item.name}
                </p>
              </Link>
            ))}
          </ul>
        </div>
        <div className="hidden h-full lg:flex">
          {session ? (
            <div className="flex items-center">
              <div className="flex h-full items-center" id={id}>
                <UserPopup />
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="m-3">
                <Link
                  href={"/auth"}
                  className="inline-flex w-32 items-center rounded border-b-2 border-blue-500 bg-white py-2 px-6 font-bold tracking-wide text-gray-800 shadow-md hover:border-blue-600 hover:bg-blue-500 hover:text-white"
                >
                  <span className="mx-auto">Giriş Yap</span>
                </Link>
              </div>
              <div className="m-3">
                <Link
                  href={"/auth"}
                  className="inline-flex w-32 items-center rounded border-b-2 border-red-500 bg-white py-2 px-6 font-bold tracking-wide text-gray-800 shadow-md hover:border-red-600 hover:bg-red-500 hover:text-white"
                >
                  <span className="mx-auto">Üye Ol</span>
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Mobile menu with tailwind css */}
        <div className="flex items-center lg:hidden">
          <button className="mobile-menu-button outline-none">
            <svg
              className="h-6 w-6 text-gray-500 hover:text-gray-600"
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
