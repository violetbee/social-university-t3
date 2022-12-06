import { Fira_Sans_Condensed } from "@next/font/google";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";

const dosis = Fira_Sans_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${dosis.className}`}>
      <div className="p-none mx-auto flex min-h-screen max-w-7xl gap-4 sm:p-4 sm:pt-10">
        {/* Left Bar */}
        <div className="hidden w-60 sm:flex">
          <LeftSideBar />
        </div>
        <div className="flex w-full flex-col gap-4 sm:space-y-4">
          <div style={{ zIndex: "1" }}>
            <Header />
          </div>
          <div className="flex space-x-4">
            <div className="sm:px-none flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
