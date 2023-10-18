import { League_Spartan } from "@next/font/google";
// import RightSideBar from "./SideBar/RightSideBar";
import Header from "../Header/Header";
import { useSession } from "next-auth/react";
import LeftSideBar from "../SideBar/LeftSideBar";
import Link from "next/link";

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
        <div className="flex h-full w-full bg-background bg-right-bottom bg-no-repeat dark:bg-darkBackground ">
          {data && <LeftSideBar />}
          <div
            className={`${
              data ? "mainCt mx-auto overflow-y-auto " : "h-full"
            } w-full `}
          >
            <div className="mx-auto flex flex-col gap-12 p-5 lg:px-16 lg:py-8 xl:max-w-[1700px]">
              {children}
            </div>
            <div className="border-t border-t-darkHelper">
              <div className="mx-auto flex justify-between gap-6 p-5 lg:px-16 lg:py-8 xl:max-w-[1700px]">
                <div className="w-1/3">
                  <Link
                    href={"/"}
                    className="cursor-pointer pt-2 text-3xl/10 tracking-tighter text-darkSecondary dark:text-white"
                  >
                    SOSYAL<span className="font-bold">ÜNİVERSİTE</span>
                  </Link>
                  <p className="mt-3 text-xs text-whitish/60">
                    Sosyal Üniversite, üniversite ve üniversite adayları için
                    geliştirilmiş bir sosyal medya platformudur. Bu platformda
                    üniversite hayatını kolaylaştıracak birçok özellik ve bu
                    özelliklerin yanında birçok eğlenceli aktivite
                    bulunmaktadır.
                  </p>
                </div>
                <div className="flex w-1/3 justify-center gap-16">
                  <div>
                    <h3 className="text-xl font-semibold">Keşfet</h3>
                    <div className="mt-3 flex flex-col gap-2 text-xs">
                      <span className="text-whitish/60">Araçlar</span>
                      <span className="text-whitish/60">Başvurular</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Hızlı Erişim</h3>
                    <div className="mt-3 flex flex-col gap-2 text-xs">
                      <span className="text-whitish/60">Üniversiteler</span>
                      <span className="text-whitish/60">Bölümler</span>
                      <span className="text-whitish/60">Topluluklar</span>
                      <span className="text-whitish/60">Etkinlikler</span>
                      <span className="text-whitish/60">İlanlar</span>
                      <span className="text-whitish/60">Anketler</span>
                      <span className="text-whitish/60">Soru Çözümleri</span>
                      <span className="text-whitish/60">
                        Üniversite Yorumları
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Platform</h3>
                    <div className="mt-3 flex flex-col gap-2 text-xs">
                      <span className="text-whitish/60">Anasayfa</span>
                      <span className="text-whitish/60">Hakkımızda</span>
                      <span className="text-whitish/60">SSS</span>
                      <span className="text-whitish/60">Şikayet</span>
                      <span className="text-whitish/60">Kullanım Şartları</span>
                      <span className="text-whitish/60">Aydınlatma Metni</span>
                      <span className="text-whitish/60">İletişim</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/5">
                  <h3 className="text-xl font-semibold">İletişim</h3>
                  <div className="mt-3 flex flex-col gap-2 text-xs">
                    <span className="text-whitish/60">
                      <span className="text-green-400">Sosyal Üniversite</span>{" "}
                      ile ilgili her türlü soru, görüş ve önerilerinizi bize
                      iletebilirsiniz.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
