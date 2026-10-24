export const AdminCardSkeleton = async () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-down">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-white/10 bg-card p-5 hover:border-foreground/40 transition-colors overflow-hidden group"
        >
          <div className="w-12 h-6 bg-gray-200/20 animate-pulse rounded-md" />
          <div className="size-8 bg-gray-200/20 animate-pulse rounded-md mt-1" />
        </div>
      ))}
    </div>
  );
};
