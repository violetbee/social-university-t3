import { League_Spartan } from "@next/font/google";
import LeftSideBar from "./SideBar/LeftSideBar";
import Header from "./Header/Header";
import { useSession } from "next-auth/react";

const dosis = League_Spartan({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  return (
    <>
      <Header />
      <main className={`${dosis.className} h-[calc(100vh_-_60px)]`}>
        <div className="flex h-full w-full bg-background ">
          {data && <LeftSideBar />}
          <div
            className={`${
              data ? "mainCt mx-auto overflow-y-auto " : "h-full"
            } w-full `}
          >
            <div className="container mx-auto 2xl:max-w-[1700px]">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
