import { Fira_Sans_Condensed } from "@next/font/google";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";

const dosis = Fira_Sans_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  display: "block",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        className={`${dosis.className} flex h-[calc(100vh_-_64px)] gap-2 bg-background`}
      >
        <LeftSideBar />
        {children}
      </main>
    </>
  );
}
