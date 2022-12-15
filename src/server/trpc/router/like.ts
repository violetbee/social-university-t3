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

  like: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // isLike
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
            isLike: true,
          },
        });
      }
      if (liked) {
        await ctx.prisma.like.update({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: ctx?.session?.user?.id as string,
            },
          },
          data: {
            isLike: true,
          },
        });
      }
    }),
  dislike: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // isLike
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
            isLike: false,
          },
        });
      }
      if (liked) {
        await ctx.prisma.like.update({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: ctx?.session?.user?.id as string,
            },
          },
          data: {
            isLike: false,
          },
        });
      }
    }),
});
