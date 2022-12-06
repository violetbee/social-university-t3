import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { MdSort, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";
import Post from "../components/Post";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { useState } from "react";

type Props = {
  user: User;
};

type PostType = {
  id: number;
  title: string;
  content: string;
  type: "text" | "doc";
  user: {
    id: number;
    name: string;
    createdAt: string;
  };
};

const OrnekTemplate: PostType[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea asperiores sint reiciendis eum quis delectus nihil quidem perspiciatis repellat hic?",
    type: "text",
    user: {
      id: 1,
      name: "Çağlar K.",
      createdAt: "2021-10-10T00:00:00.000Z",
    },
  },
  {
    id: 2,
    title: "Lorem ipsum dolor adipisicing elit.",
    content:
      "Lorem ipsum reiciendis eum quis delectus nihil quidem perspiciatis repellat hic? dolor sit amet consectetur adipisicing elit. Ea asperiores sint",
    type: "doc",
    user: {
      id: 1,
      name: "Nazlı D.",
      createdAt: "2021-10-10T00:00:00.000Z",
    },
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea asperiores sint reiciendis eum quis delectus nihil quidem perspiciatis repellat hic?",
    type: "text",
    user: {
      id: 1,
      name: "Çağlar K.",
      createdAt: "2021-10-10T00:00:00.000Z",
    },
  },
];

const Home: NextPage<Props> = ({ user }) => {
  const reversedPosts = [...OrnekTemplate].reverse();
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reversedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#F6F8FC]">
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col divide-y-[1px] rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-lg font-[500] text-stone-900">
              Kullanıcılar neler diyor?
            </p>
            <div className="flex items-center gap-1 rounded-md border-[1px] px-3 py-1 shadow-sm sm-m:px-10 ">
              <MdSort />
              <p className="mb-[1px]">Sırala</p>
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
          {reversedPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
          {/* Pagination */}
          <div className="flex items-center justify-between rounded-b-md border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  >
                    <span className="sr-only">Previous</span>
                    <BiArrowFromLeft className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                  >
                    1
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  >
                    <span className="sr-only">Next</span>
                    <BiArrowFromRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        emailVerified: true,
      },
    });
    return {
      props: {
        user,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
