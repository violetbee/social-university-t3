import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import Popup from "reactjs-popup";
import SharePost from "./SharePost";
import { Asap_Condensed } from "@next/font/google";

const dosis = Asap_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        className={`flex ${dosis.className} h-[70px] items-center border-b-2 border-black pl-6 text-[#222]`}
      >
        <Link
          href={"/"}
          className="flex h-full items-center text-4xl font-semibold tracking-widest"
        >
          <p className="bg-[#222] px-1 text-white">Sosyal</p>
          <p className="text-[#222]">Üniversite</p>
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
          <ul className="flex items-center">
            {menuItems.map((item) => (
              <Link
                href={item.url}
                key={item.id}
                className="group hidden h-20 w-24 cursor-default items-center justify-center duration-300 lg:flex xl:w-32"
              >
                <p className="cursor-pointer pt-1 text-lg tracking-wider after:block after:scale-x-0 after:border-b-[1px] after:border-black after:transition-transform after:content-[''] hover:after:origin-[0%_100%] hover:after:scale-x-105">
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
                      <button className="hidden h-full items-center justify-center md:flex">
                        <div className="flex h-full items-center justify-center border-l-2 border-black px-10">
                          {session.user?.name}{" "}
                        </div>
                        {session.user?.image ? (
                          <Image
                            src={session.user?.image}
                            alt="User Image"
                            width={100}
                            height={100}
                            className="h-full w-full border-l-2 border-black"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center border-l-2 border-black bg-black px-4">
                            <HiOutlineUserCircle className=" text-5xl text-white" />
                          </div>
                        )}
                      </button>
                    }
                    modal
                  >
                    <div className="flex flex-col items-center justify-between rounded-md border-2 border-black bg-white p-4 md:h-[400px] md:w-[550px] lg:h-[550px] lg:w-[700px]">
                      <div className="flex flex-1"></div>
                      <div className="space-x-2 self-end">
                        <button className="rounded-lg border-2 border-black bg-white px-4 py-2 font-medium text-black md:px-9">
                          Kaydet
                        </button>
                        <button
                          onClick={() => {
                            signOut();
                          }}
                          className="rounded-lg border-2 border-black bg-black px-4 py-2 font-medium text-white md:px-9"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  </Popup>
                </div>
              </div>
            ) : (
              <div className="flex h-full">
                <Link
                  href={"/auth"}
                  className="flex h-full items-center justify-center border-l-2 border-black bg-white px-10 text-black hover:bg-[#FF90E8]"
                >
                  Giriş Yap
                </Link>
                <Link
                  href={"/auth"}
                  className="flex h-full items-center justify-center border-l-2 border-black bg-black px-16 text-white hover:bg-[#FF90E8] hover:text-black"
                >
                  Üye Ol
                </Link>
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
