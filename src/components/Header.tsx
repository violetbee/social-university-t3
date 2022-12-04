import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import LeftSideBar from "./LeftSideBar";
import { trpc } from "../utils/trpc";
import Image from "next/image";

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

  return (
    <>
      {/* MediumScreen */}
      <div className="hidden w-full items-center justify-between text-white sm:flex">
        <div className="flex justify-between gap-10">
          <label htmlFor="searchBar" className="relative">
            <input
              type="text"
              className="w-full rounded-2xl bg-white px-8 py-2 pl-4 pr-10 text-stone-700 shadow-sm outline-none lg:w-96"
              id="searchBar"
            />
            <BiSearchAlt className="absolute top-1/2 right-2 h-full -translate-y-1/2 transform text-2xl text-slate-900/70" />
          </label>
          <button
            onClick={
              // This button removes users for a while
              async () => {
                await removeUsers.mutateAsync();
              }
            }
            className="rounded-lg bg-[#B21EED] px-9 py-2"
          >
            Gönderi Paylaş
          </button>
        </div>
        <div className="hidden justify-end md:flex md:flex-1">
          {session ? (
            <div className="flex items-center gap-2">
              <div className="group flex w-[50px] justify-end rounded-full border-4 border-green-900/20 bg-slate-600/80 duration-200 hover:w-40">
                <div className="flex w-full items-center justify-around ">
                  <button
                    className="hidden group-hover:block group-hover:duration-200"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <CiUser color="white" className="text-2xl" />
                  </button>
                  <button
                    className="hidden group-hover:block group-hover:duration-200"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <HiOutlineUserCircle className="text-2xl" />
                  </button>
                </div>
                {session?.user?.image ? (
                  <Image
                    className="h-[42px] w-[54px] rounded-full  "
                    alt="item"
                    src={session?.user?.image as string}
                    width={50}
                    height={75}
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900/70">
                    <p className="text-2xl font-bold text-white">
                      {session?.user?.name?.charAt(0).toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/auth"
              className="h-full rounded-lg bg-[#383F68] py-2 px-4"
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
        <div>
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
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
