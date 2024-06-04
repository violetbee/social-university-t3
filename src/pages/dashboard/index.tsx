import { GetServerSidePropsContext } from "next";
// import Events from "../../components/Cards/Event/MultiEvent";
import RootLayout from "../../components/layouts/RootLayout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
// import withDashboardSection from "../../components/HoC/withDashboardSection";
// import DiscoverYourCity from "../../components/Dashboard/DiscoverYourCitySection";
import Image from "next/image";
// import MultiPost from "../../components/Post/MultiPost";
// import Table from "../../components/Table/Table";
import { ReactElement } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { AiOutlineLike } from "react-icons/ai";
// import { FaComments } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { TbAward } from "react-icons/tb";
import { LiaSchoolSolid } from "react-icons/lia";
import University from "../../components/universityArea/University";
import {
  IoCafeOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import PostFlowSection from "../../components/Dashboard/PostFlowSection";

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
    <section className="space-y-8">
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
        <PostFlowSection />
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
          <div className="flex flex-col divide-y divide-darkSecondary px-4 py-2">
            <MostSuccessfulUser
              user={{
                rank: 1,
                name: "Ali Veli",
                department: "Bilgisayar Mühendisliği",
                img: "/images/43.jpg",
              }}
            />
            <MostSuccessfulUser
              user={{
                rank: 2,
                name: "Çağlar Karahüseyin",
                department: "Yazılım Mühendisliği",
                img: "/images/me.jpeg",
              }}
            />
            <MostSuccessfulUser
              user={{
                rank: 3,
                name: "Nazlı Durmazbilek",
                department: "Kimya Mühendisliği",
                img: "/images/nazli.jpeg",
              }}
            />
            <MostSuccessfulUser
              user={{
                rank: 4,
                name: "Mehmet Ali",
                department: "Tıp",
                img: "/images/45.jpg",
              }}
            />
          </div>
        </div>
      </div>
    </section>
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

const MostSuccessfulUser = ({
  user,
}: {
  user: {
    rank: number;
    name: string;
    department: string;
    img: string;
  };
}) => {
  return (
    <div className="flex items-center py-2">
      <div className={`flex h-10 w-10 items-center justify-center  text-white`}>
        {user.rank}
      </div>
      <div className="flex flex-1 justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-darkBackground">
            <Image
              className="h-full w-full rounded-full"
              src={user.img}
              alt={user.name}
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white">{user.name}</span>
            <span className="text-whitish/60">{user.department}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between text-sm font-light text-whitish">
          <div className="flex items-center gap-1">
            <AiOutlineLike />
            <span className="mt-1">+44</span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineBookmarkAdded />
            <span className="mt-1">+32</span>
          </div>
        </div>
      </div>
    </div>
  );
};
