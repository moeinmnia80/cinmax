import Image from "next/image";

import db from "@/lib/db";

import { SerialActions } from "./SerialAction";
import { Row, Table, TBody, TD, THead } from "@/components/ui/Table";

const getData = async (query: string) =>
  db.serial.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      country: true,
      studio: true,
      language: true,
      images: true,
      cast: {
        include: {
          person: true,
        },
      },
      crew: {
        include: {
          person: true,
        },
      },
      relatedMovies: {
        include: {
          movie: true,
        },
      },
    },
  });

export const SerialTable = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.search || "";
  const serials = await getData(query);

  return (
    <>
      <Table className="animate-slide-up">
        <THead className="text-sm border-b border-foreground/10">
          <Row className="flex py-2">
            <TD className="flex-2 ps-3">TITLE</TD>
            <TD className="flex-1">YEARS</TD>
            <TD className="flex-1">SEASONS</TD>
            <TD className="flex-1">EPISODES</TD>
            <TD className="flex-2">GENRES</TD>
            <TD className="flex-1">IMDB</TD>
            <TD className="flex-1">STATUS</TD>
            <TD className="flex-1">ACTIONS</TD>
          </Row>
        </THead>
        <TBody>
          {serials.length ? (
            serials.map((serial) => (
              <Row
                key={serial.id}
                className="flex text-foreground/20 text-sm border-b border-foreground/10 last:border-0 py-2"
              >
                <TD className="ps-3 flex-2 flex items-center gap-2">
                  <Image
                    src={serial.image}
                    alt={serial.title}
                    width={200}
                    height={200}
                    loading="eager"
                    className="max-w-14 aspect-3/4 rounded-xs"
                  />
                  <div>
                    <p className="text-foreground">{serial.title}</p>
                    <p>{serial.language.name}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="capitalize">
                        {serial.studio?.name.split(" ")[0]}
                      </span>
                      <span className="mx-1">|</span>
                      <span className="capitalize">{serial.country?.name}</span>
                    </div>
                  </div>
                </TD>
                <TD className="flex-1 flex items-center text-sm">
                  {serial.startYear}
                  {serial.endYear ? ` - ${serial.endYear}` : "- Present"}
                </TD>
                <TD className="flex-1 flex items-center text-foreground">
                  {serial.seasons}
                </TD>
                <TD className="flex-1 flex items-center text-foreground">
                  {serial.episodes}
                </TD>
                <TD className="flex-2 flex items-center gap-1">
                  {serial.genres.map((genre) => (
                    <span
                      key={genre.genreId}
                      className="bg-foreground/5 px-1 rounded-sm"
                    >
                      {genre.genre.name}
                    </span>
                  ))}
                </TD>
                <TD className="flex-1 flex items-center text-foreground">
                  {serial.rating.toFixed(1)}
                </TD>
                <TD className="flex-1 flex items-center">
                  <span
                    className={`flex items-center gap-1.5 rounded-md ${
                      serial.status === "Ongoing"
                        ? "text-green-400 bg-green-400/30 px-2 before:size-1.5 before:bg-green-400 before:rounded-full"
                        : serial.status === "Ended"
                          ? "text-foreground/60 bg-foreground/5 px-2 before:size-1.5 before:bg-foreground/60 before:rounded-full"
                          : ""
                    }`}
                  >
                    {serial.status}
                  </span>
                </TD>
                <TD className="flex-1 flex items-center">
                  <SerialActions serialId={serial.id} slug={serial.slug} />
                </TD>
              </Row>
            ))
          ) : (
            <Row className="flex py-6 justify-center text-foreground/40 text-sm">
              <TD className="w-full text-center">No serials found</TD>
            </Row>
          )}
        </TBody>
      </Table>
    </>
  );
};
