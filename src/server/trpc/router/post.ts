import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["TEXT", "DOC"]),
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
        files: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          categoryId: input.categoryId,
          userId: ctx.session?.user?.id as string,
          type: input.type,
        },
      });
    }),

  removePosts: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.post.deleteMany();
  }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const publishedTimeAgo = (date: Date) => {
      const seconds = Math.floor(
        (new Date().getTime() - date.getTime()) / 1000
      );

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

    const posts = await ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        category: true,
        like: true,
      },
    });

    const postsWithTimeAgo = posts.map((post) => {
      return {
        ...post,
        publishedTimeAgo: publishedTimeAgo(post.createdAt),
      };
    });

    return postsWithTimeAgo;
  }),
});
