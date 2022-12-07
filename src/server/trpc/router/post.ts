import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  sharePost: publicProcedure
    .input(
      z.object({
        type: z.enum(["TEXT", "DOC"]),
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
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
});
