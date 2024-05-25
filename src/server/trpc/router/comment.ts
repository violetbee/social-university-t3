import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";

export const commentRouter = router({
  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          content: true,
          user: {
            include: {
              department: {
                select: {
                  name: true,
                },
              },
            },
          },
          createdAt: true,
          _count: {
            select: {
              Like: true,
            },
          },
        },
      });

      return comments;
    }),
  postComment: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.comment.create({
          data: {
            content: input.message,
            postId: input.postId,
            userId: ctx.session?.user?.id,
          },
        });
        return { isSuccess: true, message: "Yorum başarıyla oluşturuldu" };
      } catch (err) {
        throw new Error((err as Error).message);
      }
    }),
});
