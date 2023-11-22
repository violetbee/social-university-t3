import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const likeRouter = router({
  totalLikes: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      //Get Total isLike column
      const totalLikes = await ctx.prisma.like.count({
        where: {
          postId: input.postId,
          isLike: true,
        },
      });
      const totalDislikes = await ctx.prisma.like.count({
        where: {
          postId: input.postId,
          isLike: false,
        },
      });

      const total = totalLikes - totalDislikes;
      return total;
    }),

  handleLike: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        isLiked: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const liked = await ctx.prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx?.session?.user?.id as string,
          },
        },
      });
      if (!liked) {
        await ctx.prisma.like.create({
          data: {
            postId: input.postId,
            userId: ctx?.session?.user?.id as string,
            isLike: input.isLiked,
          },
        });
      }
      if (liked) {
        await ctx.prisma.like.delete({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: ctx?.session?.user?.id as string,
            },
          },
        });
      }
    }),
  isUserLiked: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const liked = await ctx.prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx?.session?.user?.id as string,
          },
        },
      });
      if (!liked) {
        return "notLiked";
      }
      return liked.isLike;
    }),
});
