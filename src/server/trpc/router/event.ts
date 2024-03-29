import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const eventRouter = router({
  getAllEvents: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          universityId: input.query,
        },
        include: {
          eventType: true,
          user: true,
        },
      });
      return events;
    }),
  getEventTypes: publicProcedure.query(async ({ ctx }) => {
    const eventTypes = await ctx.prisma.eventType.findMany({
      orderBy: {
        events: {
          _count: "desc",
        },
      },
    });

    return { data: eventTypes, count: eventTypes.length };
  }),
});
