import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const departmentRouter = router({
  getAllDepartments: publicProcedure
    .input(
      z.object({
        universityId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const departments = await ctx.prisma.universityOnDepartment.findMany({
        where: {
          universityId: input.universityId,
        },
        select: {
          department: true,
        },
      });
      return departments;
    }),

  getClasses: publicProcedure
    .input(
      z.object({
        level: z.number(),
        departmentId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const classes = await ctx.prisma.class.findMany({
        where: {
          level: input.level,
          departmentId: input.departmentId,
        },
      });
      return classes;
    }),

  getUniversityIdByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          universityId: true,
        },
      });
      return user;
    }),
});
