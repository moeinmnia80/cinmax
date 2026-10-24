import Image from "next/image";
import { connection } from "next/server";

import { formatYears } from "@/utils";
import { SerialStatus } from "@/types/types";
import { EditButton } from "@/features/server";
import { getSerialWithQuery } from "@/data/serial";
import { COLUMNS, STATUS_STYLES } from "@/constants/serials";
import { Row, Table, TBody, TD, THead } from "@/components/ui/Table";

const StatusBadge = ({ status }: { status: SerialStatus }) => {
  const { badge, dot } = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${badge}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {status}
    </span>
  );
};

export const SerialTable = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  await connection();
  const { search } = await searchParams;
  const query = search?.trim() ?? "";
  const serials = await getSerialWithQuery(query);

  return (
    <Table className="animate-slide-up">
      <THead className="border-b border-foreground/10 text-xs tracking-wider uppercase text-foreground/60">
        <Row className="flex py-2">
          {COLUMNS.map(({ label, className }) => (
            <TD key={label} className={className}>
              {label}
            </TD>
          ))}
        </Row>
      </THead>

      <TBody>
        {serials.length ? (
          serials.map((serial) => (
            <Row
              key={serial.id}
              className="flex border-b border-foreground/10 py-2 text-sm text-foreground/50 last:border-0"
            >
              <TD className="flex flex-2 items-center gap-3 ps-3">
                <Image
                  src={serial.image}
                  alt={`${serial.title} poster`}
                  width={56}
                  height={75}
                  sizes="56px"
                  className="aspect-3/4 w-14 shrink-0 rounded-xs object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {serial.title}
                  </p>
                  <p>{serial.language.name}</p>
                  <p className="flex items-center gap-1.5 text-xs">
                    {serial.studio && (
                      <>
                        <span className="max-w-28 truncate">
                          {serial.studio.name}
                        </span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span className="truncate">
                      {serial.country?.name ?? "—"}
                    </span>
                  </p>
                </div>
              </TD>

              <TD className="flex flex-1 items-center">
                {formatYears(serial.startYear, serial.endYear, serial.status)}
              </TD>

              <TD className="flex flex-1 items-center text-foreground">
                {serial.seasons}
              </TD>

              <TD className="flex flex-1 items-center text-foreground">
                {serial.episodes}
              </TD>

              <TD className="flex flex-2 flex-wrap content-center items-center gap-1">
                {serial.genres.map(({ genreId, genre }) => (
                  <span
                    key={genreId}
                    className="rounded-sm bg-foreground/5 px-1.5 py-0.5 text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </TD>

              <TD className="flex flex-1 items-center text-foreground">
                {serial.rating.toFixed(1)}
              </TD>

              <TD className="flex flex-1 items-center">
                <StatusBadge status={serial.status} />
              </TD>

              <TD className="flex flex-1 items-center">
                <EditButton slug={serial.slug} />
              </TD>
            </Row>
          ))
        ) : (
          <Row className="flex justify-center py-10 text-sm text-foreground/40">
            <TD className="w-full text-center">
              {query ? `No serials match “${query}”` : "No serials yet"}
            </TD>
          </Row>
        )}
      </TBody>
    </Table>
  );
};
