import { Row, Table, TBody, TD, THead } from "@/components/ui/Table";

export const MovieTableSkeleton = async () => {
  return (
    <>
      <Table>
        <THead className="max-md:hidden border-b border-foreground/10 text-xs">
          <Row className="flex items-center h-12 bg-foreground/5 rounded-t-2xl overflow-hidden p-2">
            <TD className="flex-3 ps-3">TITLE</TD>
            <TD className="flex-1">YEARS</TD>
            <TD className="flex-2">GENRES</TD>
            <TD className="flex-1">IMDB</TD>
            <TD className="flex-1">CATEGORIES</TD>
            <TD className="flex-1">ACTIONS</TD>
          </Row>
        </THead>
        <TBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <Row
              key={index}
              className="flex text-foreground/20 text-sm border-b border-foreground/10 last:border-0 py-2"
            >
              <TD className="ps-3 flex-3 flex items-center gap-2">
                <div className="w-19 aspect-2/3 rounded-md bg-gray-200/20 animate-pulse" />
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
              <TD className="flex-1 flex items-center text-foreground">
                <span className="w-8 h-4 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
              <TD className="flex-2 flex items-center gap-1">
                {Array.from({ length: 2 }).map((_, index) => (
                  <span
                    key={index}
                    className="w-13 h-5.5 bg-gray-200/20 animate-pulse rounded-sm"
                  />
                ))}
              </TD>
              <TD className="flex-1 flex items-center text-foreground">
                <span className="w-18.5 h-6 bg-gray-200/20 animate-pulse rounded-full" />
              </TD>
              <TD className="flex-1 flex items-center gap-1">
                {Array.from({ length: 1 }).map((_, index) => (
                  <span
                    key={index}
                    className="w-11 h-4 bg-gray-200/20 animate-pulse rounded-sm"
                  />
                ))}
              </TD>
              <TD className="flex-1 flex items-center gap-1">
                <span className="w-8.5 h-5 bg-gray-200/20 animate-pulse rounded-sm" />
              </TD>
            </Row>
          ))}
        </TBody>
      </Table>
    </>
  );
};
