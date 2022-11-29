import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from "bcryptjs";

export const userRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
        surname: z.string().min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const saltedPassword = await bcrypt.hash(input.password, 10);
      await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: saltedPassword,
          name: input.name,
          surname: input.surname,
        },
      });
    }),
});
