import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout";
import { prisma } from "../server/db/client";
import { Category, Post as PostType, User } from "@prisma/client";
import Post from "../components/Post";
import { MdOutlineKeyboardArrowDown, MdSort } from "react-icons/md";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

type Props = {
  posts: (PostType & {
    user: User;
    category: Category;
    publishedTimeAgo: string;
  })[];
};

const Category: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <div className="flex flex-col divide-y-[1px] rounded-lg border-t-4 border-lime-600 bg-white shadow-sm">
        <div className="flex items-center justify-between  px-5 py-4">
          <p className="text-lg font-[500] text-stone-900">
            Kullanıcılar neler diyor?
          </p>
          <div className="flex items-center gap-1 rounded-md border-[1px] px-3 py-1 shadow-sm sm-m:px-10 ">
            <MdSort />
            <p className="mb-[1px]">Sırala</p>
            <MdOutlineKeyboardArrowDown />
          </div>
        </div>
        {posts.slice(0, 4).map(
          (post): JSX.Element => (
            <Post post={post} key={post.id} />
          )
        )}
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
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { category } = params as { category: string };
  const getPosts = await prisma.post.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      user: true,
      category: true,
    },
  });

  if (!getPosts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts: JSON.parse(JSON.stringify(getPosts)),
    },
  };
};
