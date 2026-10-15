import { Row, Table, TBody, TD, THead } from "@/components/ui/Table";

export const SerialTableSkeleton = async () => {
  return (
    <>
      <Table>
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
          {Array.from({ length: 5 }).map((_, index) => (
            <Row
              key={index}
              className="flex text-foreground/20 text-sm border-b border-foreground/10 last:border-0 py-2"
            >
              <TD className="ps-3 flex-2 flex items-center gap-2">
                <div className="w-14 aspect-3/4 rounded-xs bg-gray-200/20 animate-pulse" />
                <div>
                  <p className="w-25 h-4 bg-gray-200/20 animate-pulse rounded-sm" />
                  <p className="w-12.5 h-4 bg-gray-200/20 animate-pulse rounded-sm mt-1" />
                  <div className="flex items-center gap-1 text-xs">
                    <span className="w-6.5 h-3 capitalize bg-gray-200/20 animate-pulse rounded-sm" />
                    <span className="mx-1">|</span>
                    <span className="w-6.5 h-3 capitalize bg-gray-200/20 animate-pulse rounded-sm" />
                  </div>
                </div>
              </TD>
              <TD className="flex-1 flex items-center text-sm">
                <span className="w-6.5 h-3 bg-gray-200/20 animate-pulse rounded-sm" />
                <span className="mx-0.5">-</span>
                <span className="w-6.5 h-3 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
              <TD className="flex-1 flex items-center text-foreground">
                <span className="size-4 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
              <TD className="flex-1 flex items-center text-foreground">
                <span className="size-4 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
              <TD className="flex-2 flex items-center gap-1">
                {Array.from({ length: 2 }).map((_, index) => (
                  <span
                    key={index}
                    className="w-11 h-4 bg-gray-200/20 animate-pulse rounded-sm"
                  />
                ))}
              </TD>
              <TD className="flex-1 flex items-center text-foreground">
                <span className="size-4 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
              <TD className="flex-1 flex items-center">
                <span className="w-15 h-4.5 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
              <TD className="flex-1 flex items-center gap-1">
                <span className="w-8.5 h-5 bg-gray-200/20 animate-pulse rounded-sm" />
                <span className="w-7.5 h-5 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
            </Row>
          ))}
        </TBody>
      </Table>
    </>
  );
};
