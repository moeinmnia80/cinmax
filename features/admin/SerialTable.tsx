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
const CELL =
  "flex flex-col items-start gap-0.5 before:text-[10px] before:uppercase before:tracking-wider before:text-foreground/40 md:flex-row md:items-center md:gap-0 md:before:hidden";

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
    <div className="w-full md:overflow-x-auto">
      <Table className="animate-slide-up md:min-w-225">
        <THead className="max-md:hidden border-b border-foreground/10 text-xs tracking-wider uppercase text-foreground/60">
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
                className="grid grid-cols-2 gap-3 border-b border-foreground/10 px-3 py-4 text-sm text-foreground/50 last:border-0 md:flex md:gap-0 md:px-0 md:py-2"
              >
                <TD className="col-span-2 flex items-center gap-3 md:col-span-1 md:flex-2 md:ps-3">
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

                <TD className={`${CELL} before:content-['Years'] md:flex-1`}>
                  {formatYears(serial.startYear, serial.endYear, serial.status)}
                </TD>

                <TD
                  className={`${CELL} text-foreground before:content-['Seasons'] md:flex-1`}
                >
                  {serial.seasons}
                </TD>

                <TD
                  className={`${CELL} text-foreground before:content-['Episodes'] md:flex-1`}
                >
                  {serial.episodes}
                </TD>

                <TD
                  className={`${CELL} col-span-2 md:col-span-1 flex-row flex-wrap content-center gap-1 before:w-full before:content-['Genres'] md:flex-2`}
                >
                  {/* genre spans: unchanged */}
                </TD>

                <TD
                  className={`${CELL} text-foreground before:content-['Rating'] md:flex-1`}
                >
                  {serial.rating.toFixed(1)}
                </TD>

                <TD className={`${CELL} before:content-['Status'] md:flex-1`}>
                  <StatusBadge status={serial.status} />
                </TD>

                <TD className="col-span-2 flex items-center justify-end border-t border-foreground/10 pt-3 md:col-span-1 md:flex-1 md:justify-start md:border-0 md:pt-0">
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
    </div>
  );
};
