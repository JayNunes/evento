import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event not found",
      description: "Event not found",
    };
  }

  return {
    title: `${capitalizeFirstLetter(event.name)} - Evento`,
    description: `Buy Tickets - ${capitalizeFirstLetter(event.name)}`,
  };
}

export default async function Event({ params }: Props) {
  const { slug } = params;

  const event = await getEvent(slug);

  if (!event) {
    return (
      <main className="text-center py-20">
        <H1>Event not found</H1>
      </main>
    );
  }

  return (
    <main>
      <section className="relative flex justify-center items-center overflow-hidden py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover blur-3xl -z-10 absolute inset-0 w-full h-full"
        />
        <div className="z-1 flex flex-col lg:flex-row relative gap-6 lg:gap-x-16 ">
          <Image
            src={event.imageUrl}
            alt={event.name}
            quality={100}
            width={300}
            height={200}
            className="object-cover z-10 relative rounded-xl border-2 border-white/50"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto w-[95%] sm:w-full py-2 rounded-md border-white/10 border-2 bg-blur state-effects">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-8 text-white/75 max-w-4xl mx-auto">{children}</p>
  );
}
