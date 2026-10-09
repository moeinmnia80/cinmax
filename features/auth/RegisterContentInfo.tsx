import Image from "next/image";

export const RegisterContentInfo = () => {
  // TODO: ADD Fetch Api for get users length and cache, add cache component
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Image
            key={i}
            src={`/images/${i + 1}.webp`}
            alt=""
            width={200}
            height={200}
            className="size-8 rounded-full object-cover border-2 border-background"
          />
        ))}
      </div>
      <div>
        <p className="text-white text-sm font-bold">2.4M+ Members</p>
        <p className="text-white/40 text-xs">Join them today</p>
      </div>
    </div>
  );
};
