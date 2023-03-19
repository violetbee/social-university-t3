import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const universityRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.university.findMany();

    return data;
  }),
  changeUserUniversity: publicProcedure
    .input(
      z.object({
        universityId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user?.id,
        },
        data: {
          universityId: input.universityId,
        },
      });
    }),
});
