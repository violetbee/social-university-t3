import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Image from "next/image";
import { useRef } from "react";

const Dashboard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (direction: "left" | "right") => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollBy({
          left: -500,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: 500,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Layout>
      <div className="mx-auto w-full pb-4">
        <h1 className="py-2 px-5 text-3xl font-semibold leading-none text-[#222]">
          Portal
        </h1>
        <div className="h-[2px] w-full bg-black" />
        <div className="flex w-full border-black p-4">
          <blockquote className="q-card q-card-color-1">
            <div className="content">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh eusismod tincidunt.
            </div>
            <div className="author">John Doe</div>
          </blockquote>

          <blockquote className="q-card q-card-color-2">
            <div className="content">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh eusismod tincidunt.
            </div>
            <div className="author">John Doe</div>
          </blockquote>

          <blockquote className="q-card q-card-color-3">
            <div className="content">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh eusismod tincidunt.
            </div>
            <div className="author">John Doe</div>
          </blockquote>
        </div>

        <div>
          <div className="flex items-center pb-1">
            <div className="w-2 border-t-2 border-black"></div>
            <span className="mx-4 flex-shrink text-lg font-medium text-[#222]">
              Son 10 Gönderi
            </span>
            <div className="flex-grow border-t-2 border-black"></div>
            <button className="mx-4 flex-shrink border-2 border-black py-[1px] px-8 text-lg font-medium text-[#222]">
              Paylaş!
            </button>
            <div className="w-4 border-t-2 border-black"></div>
            <button className="mx-4 flex-shrink border-2 border-black bg-black py-[1px] px-8 text-lg font-medium text-white ">
              Daha Fazlasını Gör
            </button>
            <div className="w-2 border-t-2 border-black"></div>
          </div>
          <div className="flex h-44 w-full justify-between border-b-2 border-black">
            <button
              onClick={() => {
                scrollHandler("left");
              }}
              className="flex h-full w-10 items-center bg-black lg:w-24"
            >
              {/* Left Side Arrow SVG */}
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="m-2 h-20 w-20 cursor-pointer text-white hover:text-[#c461f2]"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div
              ref={scrollRef}
              className="flex w-[10px] flex-1 overflow-x-hidden"
            >
              <article className="relative flex h-full w-[300px] flex-shrink-0 border-x-2 border-black bg-white transition hover:shadow-lg lg:w-[500px]">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                    <span>Çağlar</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                  </time>
                </div>

                <div className="hidden sm:basis-56 md:block">
                  <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                      <h3 className="font-bold uppercase text-gray-900">
                        Finding the right guitar for your style - 5 tips
                      </h3>
                    </a>

                    <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-700">
                      Yazılım Mühendisliği
                    </p>
                  </div>

                  <button className="seeMore absolute bottom-2 right-2 flex w-10 items-center justify-center self-end">
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
              </article>
              <article className="relative flex h-full w-[500px] flex-shrink-0 border-x-2 border-black bg-white transition hover:shadow-lg">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                    <span>Çağlar</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                  </time>
                </div>

                <div className="hidden sm:basis-56 md:block">
                  <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                      <h3 className="font-bold uppercase text-gray-900">
                        Finding the right guitar for your style - 5 tips
                      </h3>
                    </a>

                    <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-700">
                      Yazılım Mühendisliği
                    </p>
                  </div>

                  <button className="seeMore absolute bottom-2 right-2 flex w-10 items-center justify-center self-end">
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
              </article>
              <article className="relative flex h-full w-[500px] flex-shrink-0 border-x-2 border-black bg-white transition hover:shadow-lg">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                    <span>Çağlar</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                  </time>
                </div>

                <div className="hidden sm:basis-56 md:block">
                  <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                      <h3 className="font-bold uppercase text-gray-900">
                        Finding the right guitar for your style - 5 tips
                      </h3>
                    </a>

                    <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-700">
                      Yazılım Mühendisliği
                    </p>
                  </div>

                  <button className="seeMore absolute bottom-2 right-2 flex w-10 items-center justify-center self-end">
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
              </article>
              <article className="relative flex h-full w-[500px] flex-shrink-0 border-x-2 border-black bg-white transition hover:shadow-lg">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                    <span>Çağlar</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                  </time>
                </div>

                <div className="hidden sm:basis-56 md:block">
                  <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                      <h3 className="font-bold uppercase text-gray-900">
                        Finding the right guitar for your style - 5 tips
                      </h3>
                    </a>

                    <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-700">
                      Yazılım Mühendisliği
                    </p>
                  </div>

                  <button className="seeMore absolute bottom-2 right-2 flex w-10 items-center justify-center self-end">
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
              </article>
              <article className="relative flex h-full w-[500px] flex-shrink-0 border-x-2 border-black bg-white transition hover:shadow-lg">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                    <span>Çağlar</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                  </time>
                </div>

                <div className="hidden sm:basis-56 md:block">
                  <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                      <h3 className="font-bold uppercase text-gray-900">
                        Finding the right guitar for your style - 5 tips
                      </h3>
                    </a>

                    <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-700">
                      Yazılım Mühendisliği
                    </p>
                  </div>

                  <button className="seeMore absolute bottom-2 right-2 flex w-10 items-center justify-center self-end">
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
              </article>
            </div>
            <button
              onClick={() => {
                scrollHandler("right");
              }}
              className="flex h-full w-10 items-center bg-black lg:w-24"
            >
              {/* Right Side Arrow SVG */}
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="m-2 h-20 w-20 cursor-pointer text-white hover:text-[#c461f2]"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
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
