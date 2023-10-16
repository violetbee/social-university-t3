import { GetServerSidePropsContext } from "next";
import Events from "../../components/Cards/Event/MultiEvent";
import RootLayout from "../../components/Layouts/RootLayout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import withDashboardSection from "../../components/HoC/withDashboardSection";
import DiscoverYourCity from "../../components/Dashboard/DiscoverYourCitySection";
import Image from "next/image";
import MultiPost from "../../components/Post/MultiPost";
import Table from "../../components/Table/Table";
import { ReactElement } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { AiTwotoneLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { TbAward } from "react-icons/tb";
import { LiaSchoolSolid } from "react-icons/lia";
import University from "../../components/UniversityArea/University";
import { BsBookmarkStarFill } from "react-icons/bs";
import {
  IoCafeOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";

const Dashboard = () => {
  const EventsWithExpanded = withDashboardSection(Events, "Etkinlikler", 4);
  const FeaturedSchoolClubs = withDashboardSection(Table, "Seçkin Kulüpler", 4);
  const PostsWithExpanded = withDashboardSection(
    MultiPost,
    "Trend Gönderiler",
    2,
  );
  const DiscoverYourCityExpanded = withDashboardSection(
    DiscoverYourCity,
    <>
      <span className="text-green-400">{"Samsun"}</span> Şehrini Keşfet
    </>,
  );

  return (
    <>
      <div className="grid h-full w-full grid-flow-row grid-cols-1 gap-5 md:grid-cols-4 xl:grid-cols-3">
        <div className="relative col-span-1 row-span-2 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-md border border-darkHelper bg-darkSecondary px-10 py-4 shadow-md md:col-span-2 xl:col-span-1">
          <div className="absolute -bottom-20 -right-32 h-32 w-1/2 bg-gradient-to-tl from-transparent via-transparent to-red-700 opacity-25 blur-2xl"></div>
          <div className="absolute left-0 top-0 h-40 w-1/2 bg-gradient-to-tl from-transparent via-transparent to-blue-700 opacity-25 blur-3xl"></div>
          <h3 className="self-start border-b border-darkHelper pb-1 text-2xl font-semibold">
            Selam Çağlar!
          </h3>
          <p className="mt-3 text-whitish/60">
            Sosyal Üniversite&apos;ye hoşgeldin! Sosyal Üniversite, üniversite
            ve üniversite adayları için geliştirilmiş bir sosyal medya
            platformudur.
          </p>
          <p className="text-whitish/60">
            Bu platformda üniversite hayatını kolaylaştıracak birçok özellik ve
            bu özelliklerin yanında birçok eğlenceli aktivite bulunmaktadır.
          </p>
          <button className="mt-5 self-end rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground">
            Daha Fazla Bilgi Al
          </button>
        </div>
        <div className="col-span-1 row-span-2 rounded-md border border-darkHelper bg-[#101117] p-4 pb-0 shadow-md md:col-span-2 xl:col-span-1">
          <h3 className="border-b border-darkHelper pb-1 text-2xl font-semibold">
            Duyurular
          </h3>
          <div className="mt-3 h-[233px] overflow-y-auto pr-3">
            <div className="flex flex-col gap-2">
              <div className="flex cursor-pointer items-center gap-5 rounded-md p-2 px-4 duration-200 hover:bg-darkSecondary">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-darkBackground">
                  <IoSchoolOutline size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-whitish/60">Samsun Üniversitesi</span>
                  <span className="font-extralight text-whitish/20">
                    Samsun Üniversitesi 2021-2022 Eğitim-Öğretim Yılı Mezuniyet
                    Töreni
                  </span>
                </div>
              </div>
              <div className="flex cursor-pointer items-center gap-5 rounded-md p-2 px-4 duration-200 hover:bg-darkSecondary">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-darkBackground">
                  <IoLocationOutline size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-whitish/60">Samsun Üniversitesi</span>
                  <span className="font-extralight text-whitish/20">
                    Samsun Üniversitesi 2021-2022 Eğitim-Öğretim Yılı Mezuniyet
                    Töreni
                  </span>
                </div>
              </div>
              <div className="flex cursor-pointer items-center gap-5 rounded-md p-2 px-4 duration-200 hover:bg-darkSecondary">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-darkBackground">
                  <IoSchoolOutline size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-whitish/60">Samsun Üniversitesi</span>
                  <span className="font-extralight text-whitish/20">
                    Samsun Üniversitesi 2021-2022 Eğitim-Öğretim Yılı Mezuniyet
                    Töreni
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-darkHelper bg-[#101117] p-4 shadow-md md:col-span-4 xl:col-span-1 xl:row-span-2">
          <h3 className="border-b border-darkHelper pb-1 text-2xl font-semibold">
            Yardımcı Araçlar
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-full border border-green-900/50 bg-green-900/10 p-2 px-4 text-whitish duration-150 hover:bg-whitish hover:text-darkBackground">
              <IoSchoolOutline size={24} />
              <span>Üniversitemi Ekle</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-indigo-600/50 bg-indigo-600/10 p-2 px-4 text-whitish duration-150 hover:bg-whitish hover:text-darkBackground">
              <IoLocationOutline size={24} />
              <span>Organizatör Başvurusu</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-pink-400/50 bg-pink-400/10 p-2 px-4 text-whitish duration-150 hover:bg-whitish hover:text-darkBackground">
              <LiaSchoolSolid size={24} />
              <span>Bölümümü Ekle</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-red-900/50 bg-red-900/10 p-2 px-4 text-whitish duration-150 hover:bg-whitish hover:text-darkBackground">
              <PiStudentLight size={24} />
              <span>Öğrenci Topluluğunu Ekle</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/10 p-2 px-4 text-whitish duration-150 hover:bg-whitish hover:text-darkBackground">
              <TbAward size={24} />
              <span>Öğrenci Temsilci Başvurusu</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-blue-400/50 bg-blue-400/10 p-2 px-4 text-whitish duration-150 hover:bg-whitish hover:text-darkBackground">
              <IoCafeOutline size={24} />
              <span>Mekan Öner</span>
            </button>
          </div>
          <div className="relative mt-6 w-full rounded-lg ">
            <div className="h-full w-full bg-darkSecondary p-4 blur-md" />
            <p className="absolute top-1/2 w-full -translate-y-1/2 text-center font-mono text-xl text-whitish/20">
              Yeni Araçlar Yakında!
            </p>
          </div>
        </div>
      </div>
      <Image
        src="/images/banner.png"
        className="h-full w-full rounded-md object-cover object-center shadow-md"
        alt="banner"
        width={1864}
        height={209}
      />

      <PostsWithExpanded />
      <EventsWithExpanded />
      <FeaturedSchoolClubs />
      <DiscoverYourCityExpanded />
    </>
  );
};
export default Dashboard;

Dashboard.getLayout = (page: ReactElement) => (
  <RootLayout>
    <DashboardLayout params={page.props.params}>{page}</DashboardLayout>
  </RootLayout>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  const { params } = context;

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { params: params || {} },
    };
  }
};

{
  /* <div className="relative grid grid-cols-1 gap-x-20 gap-y-10 rounded-md border border-darkHelper bg-[#101117] p-4 shadow-md lg:grid-cols-2">
        <span className="absolute left-1/2 top-1/2 hidden w-full -translate-x-1/2 -translate-y-1/2 border-t border-dashed border-darkHelper lg:block" />
        <span className="absolute left-1/2 top-1/2 hidden h-full -translate-x-1/2 -translate-y-1/2 rotate-1 border-l border-dashed border-darkHelper lg:block" />

        <div>
          <div className="flex items-center justify-between">
            <h3 className="border-b border-darkHelper pb-1 text-2xl font-semibold">
              En Başarılı Gönderi
            </h3>
            <BsBookmarkStarFill className="text-yellow-400" size={32} />
          </div>
          <div className="flex flex-col gap-5 md:flex-row xl:flex-col">
            <div className="mt-3 flex rounded-md border border-l-4 border-darkHelper border-l-darkPrimary bg-darkSecondary shadow-md">
              <div className="flex flex-col gap-2 p-4">
                <h4 className="text-xl">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, provident.
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/43.jpg"
                      alt="avatar"
                      width={100}
                      height={100}
                      className="h-10 w-10 rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <span className="text-whitish/60">
                        Çağlar Karahüseyin
                      </span>
                      <span className="font-extralight text-whitish/20">
                        Yazılım Mühendisliği
                      </span>
                    </div>
                  </div>
                  <div className="flex h-auto divide-x divide-darkHelper rounded-md bg-darkBackground text-whitish/40">
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <AiTwotoneLike />
                      <span className="pt-1">+59</span>
                    </div>
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <FaComments />
                      <span className="pt-1">87</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="border-b border-darkHelper pb-1 text-2xl font-semibold">
              En Popüler Etkinlik
            </h3>
            <BsBookmarkStarFill className="text-yellow-400" size={32} />
          </div>
          <div className="flex flex-col gap-5 md:flex-row xl:flex-col">
            <div className="mt-3 flex rounded-md border border-l-4 border-darkHelper border-l-darkPrimary bg-darkSecondary shadow-md">
              <div className="flex flex-col gap-2 p-4">
                <h4 className="text-xl">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, provident.
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/43.jpg"
                      alt="avatar"
                      width={100}
                      height={100}
                      className="h-10 w-10 rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <span className="text-whitish/60">
                        Çağlar Karahüseyin
                      </span>
                      <span className="font-extralight text-whitish/20">
                        Yazılım Mühendisliği
                      </span>
                    </div>
                  </div>
                  <div className="flex h-auto divide-x divide-darkHelper rounded-md bg-darkBackground text-whitish/40">
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <AiTwotoneLike />
                      <span className="pt-1">+59</span>
                    </div>
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <FaComments />
                      <span className="pt-1">87</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="border-b border-darkHelper pb-1 text-2xl font-semibold">
              En Başarılı Gönderi
            </h3>
            <BsBookmarkStarFill className="text-yellow-400" size={32} />
          </div>
          <div className="flex flex-col gap-5 md:flex-row xl:flex-col">
            <div className="mt-3 flex rounded-md border border-l-4 border-darkHelper border-l-darkPrimary bg-darkSecondary shadow-md">
              <div className="flex flex-col gap-2 p-4">
                <h4 className="text-xl">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, provident.
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/43.jpg"
                      alt="avatar"
                      width={100}
                      height={100}
                      className="h-10 w-10 rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <span className="text-whitish/60">
                        Çağlar Karahüseyin
                      </span>
                      <span className="font-extralight text-whitish/20">
                        Yazılım Mühendisliği
                      </span>
                    </div>
                  </div>
                  <div className="flex h-auto divide-x divide-darkHelper rounded-md bg-darkBackground text-whitish/40">
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <AiTwotoneLike />
                      <span className="pt-1">+59</span>
                    </div>
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <FaComments />
                      <span className="pt-1">87</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="border-b border-darkHelper pb-1 text-2xl font-semibold">
              En Popüler Etkinlik
            </h3>
            <BsBookmarkStarFill className="text-yellow-400" size={32} />
          </div>
          <div className="flex flex-col gap-5 md:flex-row xl:flex-col">
            <div className="mt-3 flex rounded-md border border-l-4 border-darkHelper border-l-darkPrimary bg-darkSecondary shadow-md">
              <div className="flex flex-col gap-2 p-4">
                <h4 className="text-xl">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, provident.
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/43.jpg"
                      alt="avatar"
                      width={100}
                      height={100}
                      className="h-10 w-10 rounded-full object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <span className="text-whitish/60">
                        Çağlar Karahüseyin
                      </span>
                      <span className="font-extralight text-whitish/20">
                        Yazılım Mühendisliği
                      </span>
                    </div>
                  </div>
                  <div className="flex h-auto divide-x divide-darkHelper rounded-md bg-darkBackground text-whitish/40">
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <AiTwotoneLike />
                      <span className="pt-1">+59</span>
                    </div>
                    <div className="flex h-full items-center justify-center gap-2 px-3 py-[2px]">
                      <FaComments />
                      <span className="pt-1">87</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
