// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { likeRouter } from "./like";
import { postRouter } from "./post";
import { subCategory } from "./category";
import { eventRouter } from "./event";
import { departmentRouter } from "./department";
import { universityRouter } from "./university";
import { schoolClubRouter } from "./schoolClub";
import { commentRouter } from "./comment";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  like: likeRouter,
  post: postRouter,
  subCategory: subCategory,
  event: eventRouter,
  department: departmentRouter,
  university: universityRouter,
  schoolClub: schoolClubRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
