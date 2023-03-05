import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import Popup from "reactjs-popup";
import SharePost from "./SharePost";
import { Asap_Condensed, Josefin_Sans } from "@next/font/google";

const dosis = Josefin_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

const Header: FC = () => {
  // If there is session
  const { data: session } = useSession();

  // const removeUsers = trpc.user.deleteAllUsers.useMutation();

  // const category = trpc.category.create
  //   .useMutation()
  //   .mutateAsync({ name: "Üni. Yorumları" });

  // const createCategory = trpc.category.create.useMutation();
  // const deleteAllCategories = trpc.category.deleteAll.useMutation();
  // const deleteAllPosts = trpc.post.removePosts.useMutation();

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
      {/* MediumScreen */}
      {/* <button
        className="mr-10"
        onClick={() => {
          deleteAllCategories.mutateAsync();
        }}
      >
        Kategorileri Sil
      </button>
      <button
        className="mr-10"
        onClick={() => {
          createCategory.mutateAsync({
            name: "Etkinlikler",
            slug: "etkinlikler",
          });
        }}
      >
        New Category
      </button>
      <button
        onClick={() => {
          deleteAllPosts.mutateAsync();
        }}
      >
        Postları Sil
      </button> */}
      <header
        className={`flex ${dosis.className} h-[70px] items-center border-b-[1px] border-[#444]/40 pl-6 text-[#222] lg:border-[#444]/10`}
      >
        <Link href={"/"} className="relative flex items-center">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={500}
            height={200}
            className="w-80"
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
        <div className="flex flex-1 items-center justify-evenly">
          <ul className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                href={item.url}
                key={item.id}
                className="group hidden h-20 cursor-default items-center justify-center duration-300 lg:flex"
              >
                <p className="text-md cursor-pointer pt-1 font-medium tracking-tighter text-[#666] after:block after:scale-x-0 after:border-b-[2px] after:border-[#333] after:transition-transform after:content-[''] hover:text-[#333] hover:after:origin-[0%_100%] hover:after:scale-x-100">
                  {item.name}
                </p>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex h-full">
          {
            session ? (
              <div className="flex items-center">
                <div className="flex h-full items-center">
                  <Popup
                    trigger={
                      <button className="hidden h-full items-center justify-center border-l-[1px] border-[#333]/10 pl-2 md:flex">
                        <div className="flex h-full w-44 items-center justify-center ">
                          {session.user?.name}
                          {" karahüseyin"}
                        </div>
                        {session.user?.image ? (
                          <Image
                            src={session.user?.image}
                            alt="User Image"
                            width={100}
                            height={100}
                            className="h-full w-full"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-4">
                            <HiOutlineUserCircle className=" text-5xl text-[#333]" />
                          </div>
                        )}
                      </button>
                    }
                    modal
                  >
                    <div className="flex flex-col items-center justify-between rounded-md border-2 border-[#888] bg-white p-4 md:h-[400px] md:w-[550px] lg:h-[550px] lg:w-[700px]">
                      <div className="flex flex-1"></div>
                      <div className="space-x-2 self-end">
                        <button className="rounded-lg border-2 border-[#888] bg-white px-4 py-2 font-medium text-[#333] md:px-9">
                          Kaydet
                        </button>
                        <button
                          onClick={() => {
                            signOut();
                          }}
                          className="rounded-lg border-2 border-[#888] bg-black px-4 py-2 font-medium text-white md:px-9"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  </Popup>
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
            )
            // <div className="flex items-center">
            //   <Link href="/login">
            //     <button className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-tr from-blue-700 via-purple-500 to-orange-700">
            //       <HiOutlineUserCircle className="text-2xl text-slate-50" />
            //     </button>
            //   </Link
          }
        </div>
      </header>
      {/* SmallScreen */}
      {/* <div className="sticky top-0 flex h-14 w-full items-center justify-between bg-slate-200 px-2 shadow-sm shadow-slate-500 sm:hidden">
        <div className="flex h-full items-center justify-between">
          <Link href="/">
            <div className="rounded-full bg-gradient-to-tr from-blue-700 via-purple-500 to-orange-700 px-4 py-2">
              <div className="flex h-full flex-col justify-end ">
                <h1 className="text-2xl font-semibold text-slate-50">
                  Sosyal Üniversite
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <>
          <div
            onClick={menuHandler}
            className="relative z-50 flex cursor-pointer flex-col items-center justify-center gap-2"
          >
            {isMenuOpen ? (
              <>
                <div className="absolute top-0 h-[2px] w-6 -rotate-[50deg] transform bg-white duration-150 " />
                <div className="top-0 h-[2px] w-6 rotate-[50deg] transform bg-white duration-150 " />
              </>
            ) : (
              <>
                <div className="h-[2px] w-6 bg-slate-900/70 duration-150" />
                <div className="h-[2px] w-6 bg-slate-900/70 duration-150" />
                <div className="h-[2px] w-6 bg-slate-900/70 duration-150" />
              </>
            )}
          </div>
          <div
            className={`absolute top-0 right-0 -z-20 block duration-200 ${
              isMenuOpen ? "w-full" : "w-0"
            } h-screen  bg-gray-800`}
          >
            {isMobileMenuContentOpen && (
              <div className="flex h-full w-full flex-col items-center justify-evenly">
                <div className="flex gap-4 pt-14 font-bold text-white">
                  <Link href="/auth">
                    <button className="rounded-lg bg-[#B21EED] px-10 py-2">
                      Üye Ol
                    </button>
                  </Link>
                  <Link href="">
                    <button className="rounded-lg bg-[#B21EED] px-10 py-2">
                      Giriş Yap
                    </button>
                  </Link>
                </div>
                <LeftSideBar />
              </div>
            )}
          </div>
        </>
      </div> */}
    </>
  );
};

export default Header;
