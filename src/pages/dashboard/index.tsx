import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Dashboard = () => {
  return (
    <Layout>
      <div className="h-full w-full">
        <h1 className="pb-5 text-2xl font-semibold text-[#333]">Portal</h1>
        <div className="flex w-full flex-wrap gap-5">
          <div className="w-72 rounded-lg bg-white shadow-sm">
            <div className="my-3 flex items-center justify-between rounded-l-sm border-l-4 border-l-violet-500 px-4">
              <h1 className="font-medium">Hey</h1>
              <div className="flex gap-5">
                <svg
                  className="h-5 w-5 text-gray-400 duration-100 hover:rounded-full hover:bg-gray-600 hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="h-5 w-5 text-gray-400 duration-100 hover:rounded-full hover:bg-gray-600 hover:text-white"
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
