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
      if (liked && !liked.isLike) {
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
  dislike: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const like = await ctx.prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx?.session?.user?.id as string,
          },
        },
      });
      if (like) {
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
});
