import { z } from "zod";
import { Prisma } from "@prisma/client";
import type { prisma } from "../../../server/db/client";

export const getSchoolClubsProps = z.object({
  universityId: z.string(),
});

export type GetSchoolClubsPropsScheme = z.infer<typeof getSchoolClubsProps>;

const schoolClubs: Prisma.SchoolClubSelect = {
  id: true,
  name: true,
  description: true,
  banner: true,
  slug: true,
  _count: {
    select: {
      users: true,
    },
  },
};

export const getSchoolClubs = async (
  { universityId }: GetSchoolClubsPropsScheme,
  ctx?: typeof prisma,
) => {
  const data = await ctx?.schoolClub.findMany({
    where: {
      universityId,
    },
    select: schoolClubs,
  });
  return data;
};

export type SchoolClubs = NonNullable<ReturnType<typeof getSchoolClubs>>;
