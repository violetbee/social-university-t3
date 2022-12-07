import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const likeRouter = router({
  totalLikes: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const likes = await ctx.prisma.like.count({
        where: {
          postId: input.postId,
        },
      });
      return likes;
    }),

  like: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.like.create({
        data: {
          postId: input.postId,
          userId: ctx?.session?.user?.id as string,
        },
      });
    }),
  dislike: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.like.delete({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx?.session?.user?.id as string,
          },
        },
      });
    }),
});
