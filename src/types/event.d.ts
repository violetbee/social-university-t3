import { Event, EventType } from "@prisma/client";

export type EventIncludedTypeOfEvent = Event & {
  eventType: EventType;
};

export type MultiEventProps = {
  itemPiece?: number;
  events?: EventIncludedTypeOfEvent[];
};
