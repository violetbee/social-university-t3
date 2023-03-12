import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const departmentRouter = router({
  getAllDepartments: publicProcedure
    .input(
      z.object({
        universityId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const departments = await ctx.prisma.universityOnDepartment.findMany({
        where: {
          universityId: input.universityId,
        },
        include: {
          department: true,
        },
      });
      return departments;
    }),
});
