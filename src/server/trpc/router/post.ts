import { publishedTimeAgo, slugify } from "../../../utils/func";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  createTextPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.string(),
        universityId: z.string(),
        image: z.string().nullable(),
        tags: z.array(z.string()).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.textTypePost.create({
        data: {
          title: input.title,
          content: input.content,
          slug: slugify(input.title),
          categoryId: input.categoryId,
          userId: ctx.session?.user?.id as string,
          universityId: input.universityId,
          image: input.image,
          tags: input.tags || [],
        },
      });
    }),
  createDocPost: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(4, "Başlık için minimum 4 karakter gerekmektedir.")
          .max(40, "Başlık için maksimum 40 karakter kullanabilirsiniz."),
        content: z
          .string()
          .min(10, "Açıklama için minimum 10 karakter gerekmektedir.")
          .max(300, "Açıklama için maksimum 300 karakter kullanabilirsiniz."),
        departmentId: z.string(),
        classId: z.string(),
        universityId: z.string(),
        files: z
          .array(
            z.object({
              name: z.string(),
              size: z.number(),
              type: z.string(),
              url: z.string(),
            }),
          )
          .min(
            1,
            "Dosya türünde bir gönderi oluşturabilmek için en az bir dosya yüklemeniz gerekmektedir.",
          )
          .max(8, "Bir gönderi için maksimum 8 dosya ekleyebilirsiniz."),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.docTypePost.create({
          data: {
            title: input.title,
            slug: slugify(input.title),
            content: input.content,
            classId: input.classId,
            universityId: input.universityId,
            departmentId: input.departmentId,
            userId: ctx.session?.user?.id as string,
            files: {
              createMany: {
                data: input.files.map((file) => ({
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  url: file.url,
                })),
              },
            },
          },
        });
        return { message: "Gönderiniz başarıyla oluşturuldu." };
      } catch (e) {
        throw new Error((e as Error).message);
      }
    }),
  removePosts: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.textTypePost.deleteMany();
  }),
  getAllPosts: publicProcedure
    .input(
      z.object({
        universityId: z.string(),
        slug: z.array(z.string()).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const textPosts = await ctx.prisma.textTypePost.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          universityId: input.universityId,
          category: {
            slug: input.slug ? { in: input.slug } : undefined,
          },
        },
        select: {
          id: true,
          title: true,
          content: true,
          slug: true,
          createdAt: true,
          image: true,
          category: {
            select: {
              name: true,
              color: true,
              slug: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              image: true,
              department: {
                select: {
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      const textPostsTimeAgo = [
        ...textPosts.map((post) => ({
          ...post,
          timeAgo: publishedTimeAgo(post.createdAt),
        })),
      ];

      return { posts: textPostsTimeAgo };
    }),

  getPostsSummary: publicProcedure
    .input(
      z.object({
        universityId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const textPosts = await ctx.prisma.textTypePost.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          universityId: input.universityId,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          category: {
            select: {
              name: true,
              color: true,
              slug: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              image: true,
            },
          },
        },
      });

      return { posts: textPosts };
    }),

  getTextPostsByCategory: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const textPosts = await ctx.prisma.textTypePost.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          category: {
            slug: input.slug,
          },
        },
        include: {
          user: {
            include: {
              department: true,
              university: true,
            },
          },
          category: true,
          likes: true,
        },
      });

      return { posts: textPosts };
    }),
  getDocPosts: publicProcedure.query(async ({ ctx }) => {
    const textPosts = await ctx.prisma.docTypePost.findMany({
      include: {
        user: {
          include: {
            department: true,
            university: true,
          },
        },
        likes: true,
        files: true,
        department: true,
        class: true,
      },
    });
    return { posts: textPosts };
  }),
});
