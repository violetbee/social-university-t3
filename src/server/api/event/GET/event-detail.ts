import { Prisma } from "@prisma/client";
import { prisma } from "../../../db/client";
import { z } from "zod";

const getEventDetailsProps = z.string().or(z.array(z.string()));

export type GetEventDetailsPropsScheme = z.infer<typeof getEventDetailsProps>;

/**
 * Retrieves event details based on the provided slug.
 * @param slug - The slug of the event.
 * @returns A Promise that resolves to an array of event details.
 */

const eventDetails: Prisma.EventSelect = {
  id: true,
  createdAt: true,
  title: true,
  description: true,
  image: true,
  startDate: true,
  endDate: true,
  location: true,
  price: true,
  forWho: true,
  schoolClub: {
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
  eventType: {
    select: {
      name: true,
      slug: true,
    },
  },
  user: {
    select: {
      name: true,
      surname: true,
      image: true,
    },
  },
};

export const getEventDetails = async (slug: GetEventDetailsPropsScheme) => {
  return prisma.event.findFirst({
    where: {
      slug: slug as string,
    },
    select: eventDetails,
  });
};

export type EventDetails = NonNullable<
  Awaited<ReturnType<typeof getEventDetails>>
>;
