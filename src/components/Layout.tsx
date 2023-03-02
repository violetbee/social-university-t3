import { Asap_Condensed, Sora, League_Spartan } from "@next/font/google";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";
import University from "./University";
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
      <main className={`${dosis.className} h-[calc(100vh_-_120px)] `}>
        {data && <University />}
        <div className="flex h-full w-full bg-background">
          {data && <LeftSideBar />}
          <div className="mainCt mx-auto w-full overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
