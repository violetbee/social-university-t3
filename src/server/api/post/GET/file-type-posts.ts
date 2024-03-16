import { prisma } from "../../../db/client";

export const getFileTypePosts = async (slug: string | string[]) => {
  return prisma.docTypePost.findUnique({
    where: {
      slug: String(slug),
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      tags: true,
      department: {
        select: {
          name: true,
          slug: true,
        },
      },
      files: {
        select: {
          id: true,
          name: true,
          size: true,
          type: true,
          url: true,
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
};
