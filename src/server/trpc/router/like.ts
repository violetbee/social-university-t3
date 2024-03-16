import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const likeRouter = router({
  totalLikes: publicProcedure
    .input(z.object({ postId: z.string(), type: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const totalLikes = await ctx.prisma.like.count({
        where: {
          ...(input.type === "gonderiler"
            ? { postId: input.postId }
            : { docTypePostId: input.postId }),
          isLike: true,
        },
      });
      const totalDislikes = await ctx.prisma.like.count({
        where: {
          ...(input.type === "gonderiler"
            ? { postId: input.postId }
            : { docTypePostId: input.postId }),
          isLike: false,
        },
      });

      const total = totalLikes - totalDislikes;
      return total;
    }),

  handleLike: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isLiked: z.boolean(),
        type: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const category = input.type! + "_userId";
      const liked = await ctx.prisma.like.findUnique({
        where: {
          [category]: {
            [input.type as string]: input.id,
            userId: ctx?.session?.user?.id as string,
          },
        },
      });
      if (!liked) {
        await ctx.prisma.like.create({
          data: {
            [input.type!]: input.id,
            userId: ctx?.session?.user?.id as string,
            isLike: input.isLiked,
          },
        });
      }
      if (liked) {
        await ctx.prisma.like.delete({
          where: {
            [category]: {
              [input.type!]: input.id,
              userId: ctx?.session?.user?.id,
            },
          },
        });
      }
    }),
  isUserLiked: publicProcedure
    .input(z.object({ postId: z.string(), type: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const liked = await ctx.prisma.like.findUnique({
        where:
          input.type === "gonderiler"
            ? {
                postId_userId: {
                  postId: input.postId,
                  userId: ctx?.session?.user?.id as string,
                },
              }
            : {
                docTypePostId_userId: {
                  docTypePostId: input.postId,
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
