export function FeaturedSummarySkeleton() {
  return (
    <section className="col-span-1 sm:col-span-1 rounded-2xl border border-foreground/20 bg-foreground/5 p-1 h-full min-h-45 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-between rounded-xl h-full w-full">
        <div className="flex-1 w-full rounded-xl bg-gray-200/20 animate-pulse" />

        <div className="flex-1 flex flex-col justify-center w-full max-h-27.5 self-start p-3 space-y-2">
          <div className="h-3 w-16 rounded bg-gray-200/20 animate-pulse mb-1" />

          <div className="h-5 w-20 rounded bg-gray-200/20 animate-pulse" />

          <div className="h-4 w-18 rounded bg-gray-200/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
