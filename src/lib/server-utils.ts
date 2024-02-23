import "server-only";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capitalizeFirstLetter } from "./utils";
import { unstable_cache } from "next/cache";

//* Classic fetcher functions *******************************************************

export async function fetcher<T = any>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

export function getEventUrl(slug: string) {
  return `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`;
}

export function getEventsUrl(city: string) {
  return `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`;
}

//* Prisma fetcher functions *******************************************************

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug,
    },
  });

  if (!event) {
    return notFound();
  }
  return event;
});

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalizeFirstLetter(city),
    },
    orderBy: {
      date: "asc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  let totalEvents;
  if (city === "all") {
    totalEvents = await prisma.eventoEvent.count();
  } else {
    totalEvents = await prisma.eventoEvent.count({
      where: {
        city: capitalizeFirstLetter(city),
      },
    });
  }

  return { events, totalEvents };
});
