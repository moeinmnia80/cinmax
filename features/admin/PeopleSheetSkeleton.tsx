export const PeopleSheetSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/3 animate-slide-up">
      <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
        <div className="w-20 h-7 rounded-sm bg-gray-200/20 animate-pulse" />
        <div className="w-45 h-4 rounded-sm bg-gray-200/20 animate-pulse " />
      </div>

      <ul className="-mb-px grid grid-cols-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-4 border-b border-foreground/10 px-5 py-4 transition-colors hover:bg-foreground/5 odd:border-r"
          >
            <div className="flex min-w-0 items-center gap-5">
              <div className="size-16 shrink-0 rounded-full overflow-hidden">
                <div className="size-full object-cover bg-gray-200/20 animate-pulse" />
              </div>

              <div className="min-w-0">
                <div className="w-20 h-5 rounded-sm bg-gray-200/20 animate-pulse" />
                <div className="w-43 h-4 rounded-sm bg-gray-200/20 animate-pulse mt-2" />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="w-14.5 h-7 rounded-full bg-gray-200/20 animate-pulse" />

              <div className="w-8.5 h-6 rounded-sm bg-gray-200/20 animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
