import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Events from "../../components/Cards/Event/MultiEvent";
// import Announcements from "../../inactiveComponents/Announcements/Announcements";
import CategoryAndMenuSection from "../../components/Dashboard/SearchSection";
import withDashboardSection from "../../components/HoC/withDashboardSection";
import Share from "../../components/Dashboard/PublishPostSection/ShareArea";
// import Category from "../../components/Dashboard/Category";
// import { ICategoryProps } from "../../types/app";
import MultiPost from "../../components/Post/MultiPost";
import Table from "../../components/Table/Table";
import Image from "next/image";
// import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";
// import University from "../../components/UniversityArea/University";

const Dashboard = () => {
  // const AnnouncementsWithExpanded = withDashboardSection(
  //   Announcements,
  //   "Duyurular"
  // );
  const EventsWithExpanded = withDashboardSection(Events, "🎫 Etkinlikler", 4);
  const FeaturedSchoolClubs = withDashboardSection(
    Table,
    "🎒 Seçkin Kulüpler",
    4,
  );
  const PostsWithExpanded = withDashboardSection(
    MultiPost,
    "📝 Son Paylaşımlar",
    2,
  );

  const selected = true;

  return (
    <Layout>
      <CategoryAndMenuSection />
      <Share />
      <div className="grid grid-cols-2 gap-4 text-center text-2xl font-bold text-white lg-m:grid-cols-4 2xl:grid-cols-8">
        <button
          className={`${
            selected
              ? "outline outline-1 outline-offset-4 outline-yellow-300"
              : ""
          } flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/rain.jpg')] bg-cover bg-center px-2  duration-150 hover:-translate-y-2`}
        >
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">Her şey!</span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/sun.jpg')] bg-cover bg-center px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
            Paylaşımlar
          </span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/lastOfUs.jpg')] bg-cover bg-center px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">İlanlar</span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/cat.jpg')] bg-cover bg-center px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
            Etkinlikler
          </span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/luffy.jpg')] bg-cover bg-[center_top_-32px] px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">Anketler</span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/stairs.jpg')] bg-cover bg-center px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
            Soru-Cevap
          </span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/hiroita.jpg')] bg-cover bg-center px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">Ödev Yap</span>
        </button>
        <button className="flex h-20 w-full items-center justify-center rounded-lg bg-[url('/images/categories/lotr.jpg')] bg-cover bg-[center_7rem] px-2  duration-150 hover:-translate-y-2">
          <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
            Üniversiteni Tanı
          </span>
        </button>
      </div>
      <PostsWithExpanded />
      <Image
        src="/images/banner.png"
        className="h-full w-full rounded-md object-cover object-center shadow-md"
        alt="banner"
        width={1864}
        height={209}
      />
      <EventsWithExpanded />
      <FeaturedSchoolClubs />
    </Layout>
  );
};
export default Dashboard;

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

/* <div className="grid gap-6 py-4 lg:grid-cols-12">
          <div className="col-span-8 flex grow flex-col gap-10 lg:col-span-8">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-7 flex w-full flex-col gap-4 rounded-md border border-gray-20 bg-white p-8 sm:flex-row sm:items-center sm:gap-8">
                <div className="relative h-16 w-16 drop-shadow-md">
                  <div className="absolute h-full w-full -rotate-[160deg] rounded-lg border-[1px] border-[#dd4e63]/50"></div>
                  <div className="absolute flex h-full w-full -rotate-[100deg] items-center justify-center rounded-lg border-[1px] border-[#dd4e63]/50 bg-gray-50">
                    <p className="rotate-[100deg] text-3xl font-bold">1</p>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col gap-3">
                  <span className="text-2xl font-bold text-[#222]">
                    Merhaba, Çağlar 👋
                  </span>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-2">
                      <span className="font-bold tracking-wide text-[#dd4e63]">
                        Yeni Üye
                      </span>
                      •
                      <span className="font-bold text-[#18161d]">
                        0 Tecrübe Puanı
                      </span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-md bg-gray-20">
                      <div className="absolute inset-0 w-8/12 rounded-r-md bg-[#dd4e63]"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Level 1</span>
                      <span>
                        Level 2 &nbsp;
                        <span className="text-xs text-gray-500">
                          (1000<small>XP</small>)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="col-span-5 flex w-full flex-col gap-4 rounded-md border border-gray-20 bg-white p-6 sm:flex-row sm:items-center">
                <University />
              </div>
            </div>
            <PostsWithExpanded />
            <EventsWithExpanded />
          </div>
          <div className="col-span-4 flex flex-col gap-10">
            <div className="flex w-full flex-col gap-4 rounded-md border border-gray-20 bg-white p-6 sm:flex-row sm:items-center">
              <Category params={params} />
            </div>
            <div className="flex w-full flex-col gap-4 rounded-md border border-gray-20 bg-[#11102D] p-6 text-white">
              <div className="flex flex-col">
                <span className="text-[28px] font-bold tracking-wide">
                  Aktiflik Serisi - <span className="text-[#FCD55D]">6</span>
                </span>
                <p className="pt-1 text-sm text-slate-300">
                  Yaşasın! Seriniz bugün için işaretlendi. 300XP daha fazla
                  kazanmak için günlük hedefinizi tamamlayın.
                </p>
              </div>
              <div className="mx-auto mt-6 grid max-w-lg grid-cols-7 gap-2">
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[#292430] p-3">
                  <HiLightningBolt size={30} className="text-[#FCD55D]" />
                  <span>Pzt</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[#292430] p-3">
                  <HiLightningBolt size={30} className="text-[#FCD55D]" />
                  <span>Salı</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[#292430] p-3">
                  <HiLightningBolt size={30} className="text-[#FCD55D]" />
                  <span>Çrş</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[#292430] p-3">
                  <HiLightningBolt size={30} className="text-[#FCD55D]" />
                  <span>Prş</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[#292430] p-3">
                  <HiLightningBolt size={30} className="text-[#FCD55D]" />
                  <span>Cuma</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[#292430] p-3">
                  <HiLightningBolt size={30} className="text-[#FCD55D]" />
                  <span>Cmrt</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-3">
                  <HiOutlineLightningBolt size={30} className="text-white" />
                  <span>Pzr</span>
                </div>
              </div>
              <div className="h-[2px] w-full bg-gray-400/10" />
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-300">
                    300XP daha kazanmak için 1 gün daha kaldı.
                  </span>
                  <span className="text-[#FCD55D]">6/7</span>
                </div>
                <button className="group flex items-center gap-2 rounded-lg bg-[#292430] p-3 duration-150 hover:-translate-y-2 px-2[#FCD55D] ">
                  <HiOutlineLightningBolt
                    size={30}
                    className="text-white group-hover:-translate-y-2 px-2[#222]"
                  />
                  <span className="text-sm text-white group-hover:-translate-y-2 px-2[#222]">
                    Bugünü Topla
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div> */
