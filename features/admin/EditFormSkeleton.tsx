import { cn } from "@/utils";

const Bone = ({ className = "" }: { className?: string }) => (
  <div
    className={cn(base, "animate-pulse rounded-sm bg-gray-200/20", className)}
  />
);

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5";

const FieldSkeleton = ({
  className = "",
  controlClassName = "h-9",
}: {
  className?: string;
  controlClassName?: string;
}) => (
  <div className={className}>
    <Bone className="h-3 w-16" />
    <Bone className={`mt-1 w-full ${controlClassName}`} />
  </div>
);

export const EditFormSkeleton = () => (
  <div
    className="mt-5 grid grid-cols-4 gap-4"
    aria-busy="true"
    aria-label="Loading form"
  >
    <Bone className="h-3 w-32" />
    <FieldSkeleton className="col-span-4" />
    <FieldSkeleton className="col-span-4" controlClassName="h-20" />

    <FieldSkeleton className="col-span-2" />
    <FieldSkeleton className="col-span-2" />

    <FieldSkeleton className="col-span-1" />
    <FieldSkeleton className="col-span-1" />
    <FieldSkeleton className="col-span-1" />
    <FieldSkeleton className="col-span-1" />

    <FieldSkeleton className="col-span-4" />

    {/* status select */}
    <FieldSkeleton className="col-span-4" />

    {/* genres chips */}
    <div className="col-span-4">
      <Bone className="h-3 w-14" />
      <div className="mt-2 flex gap-2">
        <Bone className="h-7 w-20 rounded-full" />
        <Bone className="h-7 w-24 rounded-full" />
        <Bone className="h-7 w-16 rounded-full" />
        <Bone className="h-7 w-16 rounded-full" />
      </div>
    </div>

    <FieldSkeleton className="col-span-2" />
    <FieldSkeleton className="col-span-2" />
    <FieldSkeleton className="col-span-2" />
    <FieldSkeleton className="col-span-2" />

    {/* media */}
    <div className="col-span-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4">
      <Bone className="h-3 w-12" />
      <div className="mt-2 grid grid-cols-2 items-start gap-4">
        <Bone className="aspect-2/3 w-full h-full rounded-lg" />
        <Bone className="aspect-video w-full h-fit rounded-lg" />
      </div>
    </div>

    <div className="sticky bottom-2 z-20 col-span-4 border border-foreground/10 backdrop-blur-xl rounded-full flex-1 flex flex-col-reverse gap-3 py-2 px-2 sm:flex-row sm:items-center sm:justify-between">
      <Bone className="flex-1 h-11 rounded-full" />
      <div className="flex-3 flex gap-3">
        <Bone className="flex-1 rounded-full" />
        <Bone className="flex-2 rounded-full" />
      </div>
    </div>
  </div>
);
