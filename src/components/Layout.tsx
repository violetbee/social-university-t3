import { Asap_Condensed } from "@next/font/google";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";
import University from "./University";
import { useSession } from "next-auth/react";

const dosis = Asap_Condensed({
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
        className={`${dosis.className} flex h-[calc(100vh_-_64px)] bg-background`}
      >
        {data && <LeftSideBar />}
        <div className="flex w-full flex-col">
          {data && <University />}
          <div className="mainCt h-full w-full overflow-y-auto px-4 py-3">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
