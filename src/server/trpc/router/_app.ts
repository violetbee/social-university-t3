// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { likeRouter } from "./like";
import { postRouter } from "./post";
import { categoryRouter } from "./category";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  like: likeRouter,
  post: postRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
