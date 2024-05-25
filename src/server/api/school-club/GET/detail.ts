import { z } from "zod";
import { Prisma } from "@prisma/client";
import { Context } from "../../../trpc/context";

const getSchoolClubDetailsProps = z.string().or(z.array(z.string()));

type GetSchoolClubDetailsPropsScheme = z.infer<
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

const getSchoolClubDetails = async (
  slug: GetSchoolClubDetailsPropsScheme,
  ctx: Context | undefined,
) => {
  return ctx?.prisma?.schoolClub.findUnique({
    where: {
      slug: slug as string,
    },
    select: schoolClubDetails,
  });
};

export type SchoolClubDetails = NonNullable<
  ReturnType<typeof getSchoolClubDetails>
>;

export { getSchoolClubDetailsProps, getSchoolClubDetails };
