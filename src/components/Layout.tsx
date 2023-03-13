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
      <main className={`${dosis.className} h-[calc(100vh_-_70px)] `}>
        {/* <University /> */}
        <div className="flex h-full w-full bg-background">
          <LeftSideBar />
          <div className="mainCt mx-auto w-full overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
