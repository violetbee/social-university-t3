import { League_Spartan } from "@next/font/google";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";
import { useSession } from "next-auth/react";
import University from "./University";

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
      <main
        className={`${dosis.className} ${
          data ? "h-[calc(100vh_-_110px)]" : "h-[calc(100vh_-_70px)]"
        } `}
      >
        {data && <University />}
        <div className="flex h-full w-full bg-background">
          {data && <LeftSideBar />}
          <div
            className={`${
              data ? "mainCt  overflow-y-auto" : "h-full"
            } mx-auto w-full`}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
