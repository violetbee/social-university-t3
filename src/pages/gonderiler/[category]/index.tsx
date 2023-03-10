import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import { prisma } from "../../../server/db/client";
import {
  Category,
  Event as TypeOfEvent,
  EventType,
  Post as PostType,
  User,
} from "@prisma/client";
import Post from "../../../components/Posts/Post";
import CategorySearch from "../../../components/CategorySearch";
import { ParsedUrlQuery } from "querystring";
import Events from "../../../components/Events/Events";

type Props = {
  posts: (PostType & {
    user: User;
    category: Category | null;
    publishedTimeAgo: string;
  })[];
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
  events?: (TypeOfEvent & {
    eventType: EventType;
  })[];
};

const Category: NextPage<Props> = ({ posts, params, events }) => {
  return (
    <Layout>
      <div className="container mx-auto w-full pb-4 lg:px-14 xl:px-16">
        <CategorySearch />
        {params?.category === "etkinlikler" ? (
          <Events events={events} />
        ) : (
          <div className="grid grid-cols-4 gap-10 px-5 pt-3 pb-3">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
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
      like: true,
    },
  });

  const events =
    params?.category === "etkinlikler"
      ? await prisma.event.findMany({
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
            eventType: true,
          },
        })
      : null;

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
      params,
      events: JSON.parse(JSON.stringify(events)),
    },
  };
};
