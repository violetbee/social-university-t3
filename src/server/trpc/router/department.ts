import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const departmentRouter = router({
  getAllDepartments: publicProcedure
    .input(
      z.object({
        schoolId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const departments = await ctx.prisma.universityOnDepartment.findMany({
        where: {
          universityId: input.schoolId,
        },
        include: {
          department: true,
        },
      });
      return departments;
    }),
});
