export function FeaturedItemListSkeleton() {
  return (
    <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-foreground/20 bg-gray-200/20 animate-pulse h-112.5 flex flex-col justify-between px-4 py-5">
      <div className="z-30 w-full">
        <div className="h-12 w-full rounded-full bg-gray-200/20 animate-pulse " />
      </div>

      <div className="relative flex items-center justify-center gap-2 h-6">
        <div className="absolute left-0 size-9 border border-foreground/10 rounded-full bg-gray-200/20 animate-pulse" />
        <div className="size-2 rounded-full bg-gray-200/20 animate-pulse" />
        <div className="size-2 rounded-full bg-gray-200/20 animate-pulse" />
        <div className="size-2 rounded-full bg-gray-200/20 animate-pulse" />
        <div className="absolute right-0 size-9 border border-foreground/10 rounded-full bg-gray-200/20 animate-pulse" />
      </div>
    </div>
  );
}
