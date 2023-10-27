import { GetServerSidePropsContext } from "next";
// import Events from "../../components/Cards/Event/MultiEvent";
import RootLayout from "../../components/Layouts/RootLayout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
// import withDashboardSection from "../../components/HoC/withDashboardSection";
// import DiscoverYourCity from "../../components/Dashboard/DiscoverYourCitySection";
import Image from "next/image";
// import MultiPost from "../../components/Post/MultiPost";
// import Table from "../../components/Table/Table";
import { ReactElement } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { AiTwotoneLike } from "react-icons/ai";
// import { FaComments } from "react-icons/fa";
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
  // const EventsWithExpanded = withDashboardSection(Events, "Etkinlikler", 4);
  // const FeaturedSchoolClubs = withDashboardSection(Table, "Seçkin Kulüpler", 4);
  // const PostsWithExpanded = withDashboardSection(
  //   MultiPost,
  //   "Trend Gönderiler",
  //   2,
  // );
  // const DiscoverYourCityExpanded = withDashboardSection(
  //   DiscoverYourCity,
  //   <>
  //     <span className="text-green-400">{"Samsun"}</span> Şehrini Keşfet
  //   </>,
  // );

  return (
    <>
      <div className="grid h-full w-full grid-flow-row grid-cols-1 gap-5 md:grid-cols-4 xl:grid-cols-3">
        <div className="relative col-span-1 row-span-2 overflow-hidden rounded-md border border-darkHelper bg-darkSecondary px-10 py-4 shadow-md md:col-span-2 xl:col-span-1">
          <div className="absolute -bottom-20 -right-32 h-32 w-1/2 bg-gradient-to-tl from-transparent via-transparent to-red-700 opacity-25 blur-2xl"></div>
          <div className="absolute left-0 top-0 h-40 w-1/2 bg-gradient-to-tl from-transparent via-transparent to-blue-700 opacity-25 blur-3xl"></div>
          <div className="relative flex flex-col items-center justify-center gap-3">
            <h3 className="w-full self-start border-b border-darkHelper pb-1 text-2xl font-semibold">
              Selam Çağlar!
            </h3>
            <p className="mt-3 text-whitish/60">
              Sosyal Üniversite&apos;ye hoşgeldin! Sosyal Üniversite, üniversite
              ve üniversite adayları için geliştirilmiş bir sosyal medya
              platformudur.
            </p>
            <p className="text-whitish/60">
              Bu platformda üniversite hayatını kolaylaştıracak birçok özellik
              ve bu özelliklerin yanında birçok eğlenceli aktivite
              bulunmaktadır.
            </p>
            <button className="mt-5 self-end rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground">
              Daha Fazla Bilgi Al
            </button>
          </div>
        </div>
        <div className="col-span-1 row-span-2 rounded-md border border-darkHelper bg-[#101117] p-4 pb-0 shadow-md md:col-span-2 xl:col-span-1 xl:row-span-1 grid-xl:row-span-2">
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
                  <span className="text-whitish/90">Samsun Üniversitesi</span>
                  <span className="font-extralight text-whitish/50">
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
                  <span className="text-whitish/90">Samsun Üniversitesi</span>
                  <span className="font-extralight text-whitish/50">
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
                  <span className="font-extralight text-whitish/50">
                    Samsun Üniversitesi 2021-2022 Eğitim-Öğretim Yılı Mezuniyet
                    Töreni
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-darkHelper bg-[#101117] p-4 shadow-md md:col-span-2 xl:col-span-1 ">
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
        </div>
        <div className="col-span-1 row-span-1 rounded-md border border-darkHelper bg-[#101117] p-4 shadow-md md:col-span-2 grid-xl:col-span-1">
          <University />
        </div>
      </div>
      <Image
        src="/images/banner.png"
        className="h-full w-full rounded-md object-cover object-center shadow-md"
        alt="banner"
        width={1864}
        height={209}
      />
      {/* <PostsWithExpanded />
        <EventsWithExpanded />
        <FeaturedSchoolClubs />
        <DiscoverYourCityExpanded /> */}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 xl:col-span-2">
          <div className="flex items-center justify-between gap-5">
            <h3 className="text-2xl font-semibold">Akış</h3>
            <button className="rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground">
              Tümünü Gör
            </button>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            <Card title="Deneme" category="Serbest Alan" />
            <Card
              title="Bu uzun bir başlıktır, bayağı uzun"
              category="Üniversite Yorumları"
            />
            <Card title="Matematik-2 Vize Notları" category="Soru Çözümleri" />
            <Card title="Samü Ulaşım Hakkında" category="Anket" />
            <Card
              title="Neden dersleri takip edemiyorum?"
              category="Etkinlik"
            />
            <Card title="Harika bir geziydi" category="İlanlar" />
            <Card title="Deneme" category="Serbest Alan" />
            <Card
              title="Bu uzun bir başlıktır, bayağı uzun"
              category="Üniversite Yorumları"
            />
            <Card title="Matematik-2 Vize Notları" category="Soru Çözümleri" />
          </div>
        </div>
        <div
          className="col-span-3 rounded-md 
        border border-darkHelper bg-[#101117] shadow-md xl:col-span-1
        "
        >
          <div className="flex items-center justify-between gap-5 p-4">
            <h3 className="text-2xl font-semibold">Başarı Sıralaması</h3>
            <button className="rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground">
              Tümünü Gör
            </button>
          </div>
          <b className="hr anim"></b>
          <div className="flex flex-col gap-4 py-4 pl-8 pr-4">
            <MostSuccessfulUser
              user={{
                rank: 1,
                name: "Ali Veli",
                department: "Bilgisayar Mühendisliği",
              }}
            />
            <MostSuccessfulUser
              user={{
                rank: 2,
                name: "Çağlar Karahüseyin",
                department: "Yazılım Mühendisliği",
              }}
            />
            <MostSuccessfulUser
              user={{
                rank: 3,
                name: "Nazlı Durmazbilek",
                department: "Kimya Mühendisliği",
              }}
            />
            <MostSuccessfulUser
              user={{
                rank: 4,
                name: "Mehmet Ali",
                department: "Tıp",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

Dashboard.getLayout = (page: ReactElement) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
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

function Card({ title, category }: { title: string; category: string }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-l-4 border-darkHelper ${
        category === "Soru Çözümleri"
          ? "border-l-red-800"
          : category === "Etkinlik"
          ? "border-l-green-800"
          : category === "İlanlar"
          ? "border-l-yellow-400"
          : category === "Anket"
          ? "border-l-blue-800"
          : category === "Üniversite Yorumları"
          ? "border-l-orange-500"
          : "border-l-purple-800"
      } bg-darkSecondary p-4 text-white shadow-md`}
    >
      <div className="text-md font-bold">{title}</div>
      <div className="flex items-center justify-between gap-10">
        {/* category tag */}
        <div className="rounded-md bg-darkBackground px-2 py-1 pt-[6px] text-sm">
          #{category}
        </div>

        <div className="flex items-center space-x-4">
          <div className="cursor-pointer">
            <img
              className="h-5 w-5 rounded-lg"
              src="https://i.pravatar.cc/300"
            />
          </div>
          <div className="cursor-pointer text-gray-500 hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <div className="cursor-pointer text-gray-500 hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const MostSuccessfulUser = ({
  user,
}: {
  user: {
    rank: number;
    name: string;
    department: string;
  };
}) => {
  return (
    <div className="relative">
      <div
        className={`absolute -left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-start rounded-xl border border-darkHelper ${
          user.rank === 1
            ? "bg-yellow-500"
            : user.rank === 2
            ? "bg-slate-400"
            : user.rank === 3
            ? "bg-amber-800"
            : "bg-white"
        } pl-[10px] pt-[2px] font-bold text-darkHelper shadow-md`}
      >
        {user.rank}
      </div>
      <div className="relative flex justify-between rounded-md border border-darkHelper bg-darkBackground px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-darkBackground">
            <img
              className="h-full w-full rounded-full"
              src="https://i.pravatar.cc/300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white">{user.name}</span>
            <span className="text-whitish/60">{user.department}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AiTwotoneLike size={24} className="text-green-500" />
            <span className="mt-1 font-semibold text-green-500">+44</span>
          </div>
          <div className="flex items-center gap-2">
            <BsBookmarkStarFill size={24} className="text-yellow-500" />
            <span className="mt-1 font-semibold text-yellow-500">+32</span>
          </div>
        </div>
      </div>
    </div>
  );
};
