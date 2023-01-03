import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import {
  RiUser5Line,
  RiSettings3Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import LeftSideBar from "./LeftSideBar";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import Popup from "reactjs-popup";
import SharePost from "./SharePost";

const Header: FC = () => {
  // If there is session
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuContentOpen, setIsMobileMenuContentOpen] = useState(false);

  const removeUsers = trpc.user.deleteAllUsers.useMutation();

  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMobileMenuContentOpen) {
      setTimeout(() => {
        setIsMobileMenuContentOpen(!isMobileMenuContentOpen);
      }, 90);
    } else {
      setIsMobileMenuContentOpen(!isMobileMenuContentOpen);
    }
  };

  // const category = trpc.category.create
  //   .useMutation()
  //   .mutateAsync({ name: "Üni. Yorumları" });

  const createCategory = trpc.category.create.useMutation();
  const deleteAllCategories = trpc.category.deleteAll.useMutation();
  const deleteAllPosts = trpc.post.removePosts.useMutation();

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
      <div className="hidden w-full items-center justify-between gap-2 text-white sm:flex">
        <div className="flex flex-1 justify-between gap-4 sm:flex-none md:gap-10 ">
          <label htmlFor="searchBar" className="relative">
            <input
              type="text"
              className={`${
                !session && "md:w-80"
              } w-full rounded-2xl bg-box px-8 py-2 pl-4 pr-10 text-white shadow-sm outline-none lg:w-96`}
              id="searchBar"
              placeholder="Ara"
            />
            <BiSearchAlt className="absolute top-1/2 right-2 h-full -translate-y-1/2 transform text-2xl text-white" />
          </label>
          {session && (
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
          )}
        </div>
        <div className="hidden justify-end sm:flex md:flex-1">
          {session ? (
            <div className="group relative rounded-full bg-slate-800">
              {session?.user?.image ? (
                <Image
                  src={session.user.image as string}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <HiOutlineUserCircle className="group relative h-[38px] w-[38px] text-2xl" />
              )}
              <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B21EED] text-xs text-white">
                1
              </div>
              <div className="absolute -bottom-[140px] right-0 hidden w-36 py-2 group-hover:flex">
                <div className="h-full w-full rounded-md bg-white p-[2px]">
                  <div className="h-full w-full divide-y-2 rounded-md border-2 bg-white text-black">
                    <div className="flex cursor-pointer items-center justify-center gap-2 p-2">
                      <RiUser5Line color="black" />
                      <p>Profil</p>
                    </div>
                    <div className="flex cursor-pointer items-center justify-center gap-2 p-2">
                      <RiSettings3Line color="black" />
                      <p>Ayarlar</p>
                    </div>
                    <div
                      onClick={() => {
                        signOut();
                      }}
                      className="flex cursor-pointer items-center justify-center gap-2 p-2"
                    >
                      <RiLogoutCircleLine color="black" />
                      <p>Çıkış Yap</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/auth"
              className="h-full rounded-lg bg-[#ef476f] py-2 px-4"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
      {/* SmallScreen */}
      <div className="sticky top-0 flex h-14 w-full items-center justify-between bg-slate-200 px-2 shadow-sm shadow-slate-500 sm:hidden">
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
          {/* Burger Menu */}
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
                {/* Register and Login */}
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
      </div>
    </>
  );
};

export default Header;
