import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import { prisma } from "../../../server/db/client";
import { Category, Post as PostType, User } from "@prisma/client";
import Post from "../../../components/Post";
import { MdOutlineKeyboardArrowDown, MdSort } from "react-icons/md";

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
      <div className="flex w-full flex-col items-center rounded-lg border-t-4 border-lime-600 bg-box text-white shadow-sm">
        <div className="flex w-full items-center justify-between px-5 py-4">
          <p className="text-lg font-[500]">Kullanıcılar neler diyor?</p>
          <div className="flex items-center gap-1 rounded-md border-[1px]  px-3 py-1 shadow-sm sm-m:px-10 ">
            <MdSort />
            <p className="mb-[1px]">Sırala</p>
            <MdOutlineKeyboardArrowDown />
          </div>
        </div>
        {posts.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-3 bg-primary px-4 py-3 lg:grid-cols-2">
            {posts.slice(0, 4).map(
              (post): JSX.Element => (
                <Post post={post} key={post.id} />
              )
            )}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center bg-primary py-10">
            <p className="text-lg font-[500]">Henüz bir gönderi yok.</p>
          </div>
        )}
        <div className="py-4" />
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
