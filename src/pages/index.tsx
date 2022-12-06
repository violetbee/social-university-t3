import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { MdSort, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";

import { FcLike, FcDislike } from "react-icons/fc";
import { GoCommentDiscussion } from "react-icons/go";
import { TiWarning } from "react-icons/ti";
import { BiArchive } from "react-icons/bi";
import { ImDownload } from "react-icons/im";
import Post from "../components/Post";

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
  console.log(user);

  const reversedPosts = [...OrnekTemplate].reverse();

  return (
    <div className="bg-[#F6F8FC]">
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col divide-y-[1px] rounded-md bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-lg font-[500] text-stone-900">
              Kullanıcılar neler diyor?
            </p>
            <div className="flex items-center gap-1 rounded-md border-[1px] px-10 py-1 shadow-sm">
              <MdSort />
              <p className="mb-[1px]">Sırala</p>
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
          {reversedPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
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
