import { z } from "zod";
import { Prisma } from "@prisma/client";
import { Context } from "../../../trpc/context";

const getSchoolClubsProps = z.object({
  universityId: z.string(),
});

type GetSchoolClubsPropsScheme = z.infer<typeof getSchoolClubsProps>;

const schoolClubs: Prisma.SchoolClubSelect = {
  id: true,
  name: true,
  description: true,
  banner: true,
  slug: true,
  rating: true,
  _count: {
    select: {
      users: true,
    },
  },
};

const getSchoolClubs = async (
  { universityId }: GetSchoolClubsPropsScheme,
  ctx: Context,
) => {
  return ctx.prisma?.schoolClub.findMany({
    where: {
      universityId,
    },
    select: schoolClubs,
  });
};

export type SchoolClubs = NonNullable<ReturnType<typeof getSchoolClubs>>;

export { getSchoolClubsProps, getSchoolClubs };
