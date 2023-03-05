import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import { prisma } from "../../../server/db/client";
import { Category, Post as PostType, User } from "@prisma/client";
import Post from "../../../components/Post";
import { MdOutlineKeyboardArrowDown, MdSort } from "react-icons/md";
import CategorySearch from "../../../components/CategorySearch";

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
      <div className="container mx-auto w-full pb-4 lg:px-14 xl:px-16">
        <CategorySearch />
        {/* Gönderileri */}
      </div>
    </Layout>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { category } = params as { category: string };
  const getPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
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

  const publishedTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval + " yıl önce";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " ay önce";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " gün önce";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " saat önce";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " dakika önce";
    }
    return Math.floor(seconds) + " saniye önce";
  };

  const postsWithTimeAgo = getPosts.map((post) => {
    return {
      ...post,
      publishedTimeAgo: publishedTimeAgo(post.createdAt),
    };
  });

  if (!getPosts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts: JSON.parse(JSON.stringify(postsWithTimeAgo)),
    },
  };
};

{
  /* <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MdSort className="text-2xl" />
            <p className="text-lg">Sırala</p>

            <div className="flex items-center space-x-2">
              <MdOutlineKeyboardArrowDown className="text-2xl" />
              <p className="text-lg">Tarihe Göre</p>
            </div>

            <div className="flex items-center space-x-2">
              <MdOutlineKeyboardArrowDown className="text-2xl" />
              <p className="text-lg">Popülerlik</p>
            </div>
          </div>
        </div> */
}
