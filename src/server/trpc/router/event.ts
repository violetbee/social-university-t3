import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const eventRouter = router({
  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        eventType: true,
        user: true,
      },
    });
    return events;
  }),
});
