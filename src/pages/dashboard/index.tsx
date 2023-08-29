import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Events from "../../components/Cards/Event/MultiEvent";
// import Announcements from "../../inactiveComponents/Announcements/Announcements";
import CategoryAndMenuSection from "../../components/Dashboard/SearchSection";
import withDashboardSection from "../../components/HoC/withDashboardSection";
import Share from "../../components/Dashboard/PublishPostSection/ShareArea";
import Category from "../../components/Dashboard/Category";
import { ICategoryProps } from "../../types/app";
import MultiPost from "../../components/Post/MultiPost";

const Dashboard = ({ params }: ICategoryProps) => {
  // const AnnouncementsWithExpanded = withDashboardSection(
  //   Announcements,
  //   "Duyurular"
  // );
  const EventsWithExpanded = withDashboardSection(Events, "Etkinlikler", 5);
  const PostsWithExpanded = withDashboardSection(
    MultiPost,
    "Son Gönderiler",
    5,
  );

  return (
    <Layout>
      <div className="w-full lg:px-14 xl:px-16">
        <CategoryAndMenuSection />
        <Share />

        <div className="grid gap-6 py-4 lg:grid-cols-12">
          <div className="container col-span-8 flex grow flex-col gap-10 lg:col-span-8">
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8 sm:flex-row sm:items-center sm:gap-8">
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
                    <span className="font-bold text-[#333]">
                      0 Tecrübe Puanı
                    </span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-md bg-gray-200">
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
            <PostsWithExpanded />
            <EventsWithExpanded />
          </div>
          <div className="col-span-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <Category params={params} />
            </div>
          </div>
        </div>
      </div>
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
