import { z } from "zod";
import { Prisma } from "@prisma/client";
import { type prisma } from "../../../server/db/client";

export const getSchoolClubDetailsProps = z.string();

export type GetSchoolClubDetailsPropsScheme = z.infer<
  typeof getSchoolClubDetailsProps
>;

const schoolClubDetails: Prisma.SchoolClubSelect = {
  id: true,
  name: true,
  description: true,
  banner: true,
  slug: true,
  University: {
    select: {
      name: true,
      slug: true,
    },
  },
  users: {
    select: {
      id: true,
      name: true,
      surname: true,
      image: true,
      department: {
        select: {
          name: true,
          slug: true,
        },
      },
      university: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
};

export const getSchoolClubDetails = async (
  slug: GetSchoolClubDetailsPropsScheme,
  ctx?: typeof prisma,
) => {
  const schoolClub = await ctx?.schoolClub.findUnique({
    where: {
      slug,
    },
    select: schoolClubDetails,
  });
  return schoolClub;
};

export type SchoolClubDetails = NonNullable<
  ReturnType<typeof getSchoolClubDetails>
>;
