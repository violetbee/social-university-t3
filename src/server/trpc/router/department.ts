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
  getClassLevels: publicProcedure
    .input(
      z.object({
        departmentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const classLevels = await ctx.prisma.departmentsOnClassLevel.findMany({
        where: {
          departmentId: input.departmentId,
        },
        include: {
          classLevel: true,
        },
      });
      return classLevels;
    }),

  getClasses: publicProcedure
    .input(
      z.object({
        classLevelId: z.string(),
        departmentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const classes = await ctx.prisma.class.findMany({
        where: {
          classLevelId: input.classLevelId,
          departmentId: input.departmentId,
        },
      });
      return classes;
    }),

  getUniversityIdByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
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
