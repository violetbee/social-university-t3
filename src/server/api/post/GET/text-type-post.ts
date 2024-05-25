import { prisma } from "../../../db/client";

export const getTextTypePost = async (slug: string | string[]) => {
  return prisma.textTypePost.findUnique({
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
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
};
