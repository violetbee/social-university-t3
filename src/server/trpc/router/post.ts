import { publishedTimeAgo, slugify } from "../../../utils/func";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  createTextPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
        universityId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.textTypePost.create({
        data: {
          title: input.title,
          content: input.content,
          slug: slugify(input.title),
          categoryId: input.categoryId,
          userId: ctx.session?.user?.id as string,
          universityId: input.universityId,
        },
      });
    }),
  createDocPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        departmentId: z.string(),
        classId: z.string(),
        classLevelId: z.string(),
        universityId: z.string(),
        files: z.array(
          z.object({
            name: z.string(),
            size: z.number(),
            type: z.string(),
            url: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.docTypePost.create({
        data: {
          title: input.title,
          slug: slugify(input.title),
          content: input.content,
          classId: input.classId,
          classLevelId: input.classLevelId,
          universityId: input.universityId,
          departmentId: input.departmentId,
          userId: ctx.session?.user?.id as string,
          files: {
            createMany: {
              data: input.files.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                url: file.url,
              })),
            },
          },
        },
      });
    }),
  removePosts: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.textTypePost.deleteMany();
  }),
  getAllTypePosts: publicProcedure
    .input(
      z.object({
        query: z.string().nullable(),
        slug: z.string().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const textPosts = await ctx.prisma.textTypePost.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          universityId: input.query,
          category: {
            slug: input.slug || undefined,
          },
        },
        include: {
          user: true,
          category: true,
          likes: true,
        },
      });

      const docPosts = await ctx.prisma.docTypePost.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          universityId: input.query,
        },
        include: {
          user: true,
          likes: true,
          files: true,
          department: true,
          class: true,
          classLevel: true,
        },
      });

      const textPostsAndDocPostsTimeAgo = [
        ...textPosts.map((post) => ({
          ...post,
          timeAgo: publishedTimeAgo(post.createdAt),
        })),
        ...docPosts.map((post) => ({
          ...post,
          timeAgo: publishedTimeAgo(post.createdAt),
        })),
      ];

      const sortedPostsByCreatedAt = textPostsAndDocPostsTimeAgo.sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt)
      );

      return { posts: sortedPostsByCreatedAt };
    }),
  getTextPostsByCategory: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const textPosts = await ctx.prisma.textTypePost.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          category: {
            slug: input.slug,
          },
        },
        include: {
          user: {
            include: {
              department: true,
              university: true,
              class: true,
              classLevel: true,
            },
          },
          category: true,
          likes: true,
        },
      });
      return { posts: textPosts };
    }),
  getDocPosts: publicProcedure.query(async ({ ctx }) => {
    const textPosts = await ctx.prisma.docTypePost.findMany({
      include: {
        user: {
          include: {
            department: true,
            university: true,
            class: true,
            classLevel: true,
          },
        },
        likes: true,
        files: true,
        department: true,
        class: true,
        classLevel: true,
      },
    });
    return { posts: textPosts };
  }),
});
