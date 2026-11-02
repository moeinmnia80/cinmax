export function GenreChartSkeleton() {
  return (
    <section className="col-span-1 sm:col-span-2 rounded-2xl border border-foreground/20 bg-foreground/5">
      <div className="flex flex-col items-center gap-1 h-full p-1 md:items-stretch md:flex-row md:justify-between">
        <div className="shrink-0 flex items-center justify-center pr-3">
          <div className="size-55 max-w-full rounded-full bg-gray-200/20 animate-pulse flex flex-col items-center justify-center gap-2">
            <div className="size-10 rounded bg-gray-200/20 animate-pulse" />
            <div className="h-4 w-16 rounded bg-gray-200/20 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-1 p-3 my-1 md:my-0">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-2 py-1"
            >
              <div className="flex items-center gap-2">
                <div className="size-3.5 rounded-[3px] bg-gray-200/20 animate-pulse shrink-0" />
                <div className="h-4 w-14 rounded bg-gray-200/20 animate-pulse" />
              </div>
              <div className="h-4 w-10 rounded bg-gray-200/20 animate-pulse shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
