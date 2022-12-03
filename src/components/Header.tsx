import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import LeftSideBar from "./LeftSideBar";
import { trpc } from "../utils/trpc";

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
        <div className="hidden justify-between  md:flex">
          {session ? (
            <div className="flex items-center gap-2">
              <button
                className="text-slate-900"
                onClick={() => {
                  signOut();
                }}
              >
                Çıkış Yap
              </button>
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
      <div className="sticky top-0 flex h-14 w-full items-center justify-between bg-slate-200 px-2 shadow-md shadow-slate-500 sm:hidden">
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
