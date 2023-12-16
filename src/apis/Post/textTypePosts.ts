import { prisma } from "../../server/db/client";

export const getTextTypePosts = async (slug: string) => {
  const textPostBySlug = await prisma.textTypePost.findUnique({
    where: {
      slug: String(slug),
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      image: true,
      tags: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          image: true,
          department: {
            select: {
              name: true,
            },
          },
          university: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return textPostBySlug;
};
