import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany();
    return categories;
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.category.create({
        data: {
          name: input.name,
        },
      });
    }),
  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.category.deleteMany();
  }),
});
