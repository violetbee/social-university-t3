import Layout from "../../components/Layout";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { GetServerSidePropsContext } from "next";

const Portal = () => {
  return (
    <Layout>
      <div className="mx-auto h-full w-full">
        <h1 className="pb-5 text-2xl font-semibold text-[#333]">Etkinlikler</h1>
        <Masonry
          breakpointCols={5}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <div className="group relative mb-5 h-44 w-72 cursor-pointer">
            <div className="absolute top-0 right-0 h-full w-full rounded-lg bg-[#333] shadow-sm " />
            <div className="absolute -top-1 -right-1 h-full w-full rounded-lg border-[1px] border-[#333] bg-white shadow-sm duration-200 group-hover:top-0 group-hover:right-0">
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#333]">
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="group mb-5 w-72">
            <div className=" rounded-lg bg-[#333] shadow-sm">
              <div className="relative flex -translate-y-1 translate-x-1 flex-col rounded-lg border-[1px] border-[#333] bg-white shadow-sm duration-200 group-hover:translate-y-0 group-hover:translate-x-0">
                <Image
                  src="/images/konser.webp"
                  alt=""
                  width={200}
                  height={200}
                  className="h-24 w-full rounded-t-md object-cover"
                />
                <h1 className="px-3 py-2 text-lg font-semibold leading-6 tracking-wider">
                  Apex Legends Turnuvası
                </h1>
                <div className="flex justify-between">
                  <span className="px-3 font-medium">Etkinlik Tarihi:</span>
                  <span className="px-3">21.04.2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="px-3 font-medium">
                    Etkinlik Bitiş Tarihi:
                  </span>
                  <span className="px-3">21.04.2023</span>
                </div>

                <div
                  className={`flex h-10 w-full items-center justify-center border-y-[1px] ${
                    "file" === "file" ? "bgFile" : "bgNormal"
                  }`}
                >
                  <p className="text-lg font-medium text-white">
                    Bu gönderi 3 adet dosya içermektedir
                  </p>
                </div>
                <div className="flex items-center justify-between px-3 pt-2 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 lg:mb-0">
                      <Image
                        src="/images/43.jpg"
                        className="h-full w-full overflow-hidden rounded-full shadow"
                        alt=""
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-sm font-medium">
                        Çağlar Karahüseyin
                      </h1>
                      <p className="text-xs text-gray-500">
                        Yazılım Mühendisliği
                      </p>
                      <p className="text-xs text-gray-500">
                        1 saat önce oluşturuldu
                      </p>
                    </div>
                  </div>
                  <button className="seeMore flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="group mb-5 w-72">
            <div className="w-full rounded-lg bg-[#333] shadow-sm">
              <div className="flex -translate-y-1 translate-x-1 flex-col rounded-lg border-[1px] border-[#333] bg-white shadow-sm duration-200 group-hover:translate-y-0 group-hover:translate-x-0">
                <h1 className="px-3 py-2 text-lg font-medium leading-6 tracking-wider">
                  Harika bir gönderi!
                </h1>
                <p className="px-3 pb-1 text-sm ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta quasi aliquid laboriosam quibusdam quo corporis vel,
                  odit quos in explicabo et consequuntur tenetur facilis
                  laudantium assumenda reiciendis dolor molestias est!
                </p>
                <button className="seeMore mx-3 my-4 flex items-center justify-center self-end">
                  {/* Read more svg icon direction right */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Masonry>
      </div>
    </Layout>
  );
};

export default Portal;

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
