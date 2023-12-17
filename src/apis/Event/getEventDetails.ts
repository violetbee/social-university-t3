import { prisma } from "../../server/db/client";
import { z } from "zod";

const inputGetEventDetails = z.string();

type InputGetEventDetails = z.infer<typeof inputGetEventDetails>;

/**
 * Retrieves event details based on the provided slug.
 * @param slug - The slug of the event.
 * @returns A Promise that resolves to an array of event details.
 */
export const getEventDetails = async (slug: InputGetEventDetails) => {
  const events = await prisma.event.findFirst({
    where: {
      slug,
    },
    select: {
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
    },
  });

  return events;
};

export type EventDetails = {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  image?: string | null;
  startDate: Date;
  endDate: Date;
  location: string;
  price: number | null;
  forWho: string;
  schoolClub: {
    name: string;
    slug: string;
  } | null;
  university: {
    name: string;
    slug: string;
  } | null;
  eventType: {
    name: string;
    slug: string | null;
  };
  user: {
    name: string | null;
    surname: string | null;
    image: string | null;
  };
};
