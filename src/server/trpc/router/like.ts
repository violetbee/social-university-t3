import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const likeRouter = router({
  totalLikes: publicProcedure
    .input(z.object({ postId: z.string(), type: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const totalLikes = await ctx.prisma.like.count({
        where: {
          ...(input.type === "gonderiler"
            ? { postId: input.postId }
            : { docTypePostId: input.postId }),
          isLike: true,
        },
      });
      const totalDislikes = await ctx.prisma.like.count({
        where: {
          ...(input.type === "gonderiler"
            ? { postId: input.postId }
            : { docTypePostId: input.postId }),
          isLike: false,
        },
      });

      const total = totalLikes - totalDislikes;
      return total;
    }),

  handleLike: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isLiked: z.boolean(),
        type: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const likeCountHandler = (positive: number, negative: number) => {
        return positive >= negative
          ? String(positive - negative)
          : `-${negative - positive}`;
      };

      const likeHandler = {
        gonderiler: async () => {
          const postId = input.id;
          const userId = ctx?.session?.user?.id as string;

          const touched = await ctx.prisma.like.findUnique({
            where: {
              postId_userId: {
                postId,
                userId,
              },
            },
          });

          if (!touched) {
            await ctx.prisma.like.create({
              data: {
                postId,
                userId,
                isLike: input.isLiked,
              },
            });
          } else if (input.isLiked === touched?.isLike) {
            await ctx.prisma.like.delete({
              where: {
                postId_userId: {
                  postId,
                  userId,
                },
              },
            });
          } else {
            await ctx.prisma.like.update({
              where: {
                postId_userId: {
                  postId,
                  userId,
                },
              },
              data: {
                isLike: input.isLiked,
              },
            });
          }

          const positiveLikes = await ctx.prisma.like.count({
            where: {
              postId,
              isLike: true,
            },
          });

          const negativeLikes = await ctx.prisma.like.count({
            where: {
              postId,
              isLike: false,
            },
          });

          return {
            likeCount: likeCountHandler(positiveLikes, negativeLikes),
            liked: await ctx.prisma.like.findUnique({
              where: {
                postId_userId: {
                  postId,
                  userId,
                },
              },
            }),
          };
        },
        "dosya-paylasimlari": async () => {
          const docTypePostId = input.id;
          const userId = ctx?.session?.user?.id as string;

          const touched = await ctx.prisma.like.findUnique({
            where: {
              docTypePostId_userId: {
                docTypePostId,
                userId,
              },
            },
          });

          if (!touched) {
            await ctx.prisma.like.create({
              data: {
                docTypePostId,
                userId,
                isLike: input.isLiked,
              },
            });
          } else if (input.isLiked === touched?.isLike) {
            await ctx.prisma.like.delete({
              where: {
                docTypePostId_userId: {
                  docTypePostId,
                  userId,
                },
              },
            });
          } else {
            await ctx.prisma.like.update({
              where: {
                docTypePostId_userId: {
                  docTypePostId,
                  userId,
                },
              },
              data: {
                isLike: input.isLiked,
              },
            });
          }

          const positiveLikes = await ctx.prisma.like.count({
            where: {
              docTypePostId,
              isLike: true,
            },
          });

          const negativeLikes = await ctx.prisma.like.count({
            where: {
              docTypePostId,
              isLike: false,
            },
          });

          return {
            likeCount: likeCountHandler(positiveLikes, negativeLikes),
            liked: input.isLiked === touched?.isLike ? null : input.isLiked,
          };
        },
        yorum: async () => {
          const commentId = input.id;
          const userId = ctx?.session?.user?.id as string;

          const touched = await ctx.prisma.like.findUnique({
            where: {
              commentId_userId: {
                commentId,
                userId,
              },
            },
          });

          if (!touched) {
            await ctx.prisma.like.create({
              data: {
                commentId,
                userId,
                isLike: input.isLiked,
              },
            });
          } else if (input.isLiked === touched?.isLike) {
            await ctx.prisma.like.delete({
              where: {
                commentId_userId: {
                  commentId,
                  userId,
                },
              },
            });
          } else {
            await ctx.prisma.like.update({
              where: {
                commentId_userId: {
                  commentId,
                  userId,
                },
              },
              data: {
                isLike: input.isLiked,
              },
            });
          }

          const positiveLikes = await ctx.prisma.like.count({
            where: {
              commentId,
              isLike: true,
            },
          });

          const negativeLikes = await ctx.prisma.like.count({
            where: {
              commentId,
              isLike: false,
            },
          });

          return {
            commentCount: likeCountHandler(positiveLikes, negativeLikes),
            liked: input.isLiked === touched?.isLike ? null : input.isLiked,
          };
        },
        default: async () => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Bir hata oluştu.",
          });
        },
      };

      return likeHandler[
        (input.type as keyof typeof likeHandler) ?? "default"
      ]();
    }),
  isUserLiked: publicProcedure
    .input(z.object({ postId: z.string(), type: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const isLikedHandler = {
        gonderiler: async () => {
          const postId = input.postId;
          const userId = ctx?.session?.user?.id as string;

          const liked = await ctx.prisma.like.findUnique({
            where: {
              postId_userId: {
                postId,
                userId,
              },
            },
          });

          if (!liked) {
            return "notLiked";
          }
          return liked.isLike;
        },
        "dosya-paylasimlari": async () => {
          const docTypePostId = input.postId;
          const userId = ctx?.session?.user?.id as string;

          const liked = await ctx.prisma.like.findUnique({
            where: {
              docTypePostId_userId: {
                docTypePostId,
                userId,
              },
            },
          });

          if (!liked) {
            return "notLiked";
          }
          return liked.isLike;
        },
        yorum: async () => {
          const commentId = input.postId;
          const userId = ctx?.session?.user?.id as string;

          const liked = await ctx.prisma.like.findUnique({
            where: {
              commentId_userId: {
                commentId,
                userId,
              },
            },
          });

          return liked?.isLike;
        },
        default: async () => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Bir hata oluştu.",
          });
        },
      };

      return isLikedHandler[
        (input.type as keyof typeof isLikedHandler) ?? "default"
      ]();
    }),
});
