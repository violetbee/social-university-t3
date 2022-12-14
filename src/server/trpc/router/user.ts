import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from "bcryptjs";

export const userRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email({ message: "Geçersiz e-posta adresi." }),
        password: z
          .string()
          .min(8, { message: "Şifre en az 8 karakter olmalıdır." }),
        name: z
          .string()
          .min(2, { message: "İsim en az 2 karakter olmalıdır." }),
        surname: z
          .string()
          .min(2, { message: "Soy isim en az 2 karakter olmalıdır." }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const saltedPassword = await bcrypt.hash(input.password, 10);
      const isUserExist = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (isUserExist) {
        throw new Error("Bu email adresi kullanılmaktadır.");
      }
      await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: saltedPassword,
          name: input.name,
          surname: input.surname,
        },
      });
    }),
  deleteAllUsers: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.user.deleteMany();
  }),
  getUserById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
      });
      return user;
    }),
});
