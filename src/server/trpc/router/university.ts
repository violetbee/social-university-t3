import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const universityRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        universityName: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input) {
        const all = await ctx.prisma.university.findMany({
          where: {
            name: {
              contains: input.universityName,
            },
          },
          include: {
            _count: {
              select: {
                users: true,
              },
            },
          },
        });
        return all;
      }
      const all = await ctx.prisma.university.findMany();
      return all;
    }),
  changeUserUniversity: publicProcedure
    .input(
      z.object({
        universityId: z.string(),
      }),
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
