export const AdminBoxSkeleton = () => {
  return (
    <div className="bg-foreground/5 rounded-md border border-foreground/10 animate-slide-down">
      <div className="flex items-center justify-between px-4 py-5 border-b border-foreground/10">
        <span className="w-15 h-7.5 bg-gray-200/20 animate-pulse rounded-sm" />
        <span className="w-23.5 h-6 bg-gray-200/20 animate-pulse rounded-sm" />
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-16 aspect-3/4 bg-gray-200/20 animate-puls rounded-sm overflow-hidden shrink-0">
              <div className="w-full h-full object-cover e" />
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center gap-1">
                <span className="w-32.5 h-6 bg-gray-200/20 animate-pulse rounded-sm" />
                <span className="w-28 h-5 bg-gray-200/20 animate-pulse rounded-sm" />
                <span className="w-22 h-5 bg-gray-200/20 animate-pulse rounded-sm" />
              </div>
              <div className="flex flex-col">
                <span className="flex justify-center items-center h-fit gap-2">
                  <span className="size-5 bg-gray-200/20 animate-pulse rounded-sm" />
                  <span className="w-8 h-5 bg-gray-200/20 animate-pulse rounded-sm" />
                </span>
                <span className="w-14 h-5 bg-gray-200/20 animate-pulse rounded-sm mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
