export const PeopleHeaderSkeleton = () => {
  return (
    <div className="flex justify-between items-center border-b border-foreground/10 py-5 px-4 animate-slide-down">
      <div className="flex flex-col ">
        <div className="w-32 h-7 bg-gray-200/20 rounded-md animate-pulse" />
        <div className="w-46 h-4 bg-gray-200/20 rounded-md animate-pulse mt-2" />
      </div>
      <div className="w-61.5 h-11 bg-gray-200/20 rounded-full animate-pulse" />
    </div>
  );
};
