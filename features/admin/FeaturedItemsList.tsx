import { use } from "react";
import Image from "next/image";

import { type FeaturedItem } from "@/types/types";
import { Star } from "lucide-react";

interface FeaturedItemsListProps {
  data: Promise<FeaturedItem[]>;
}

export const FeaturedItemsList = ({ data }: FeaturedItemsListProps) => {
  const featuredItems = use(data);

  return (
    <section
      className="bg-foreground/5 rounded-md border border-foreground/10 animate-scale-in"
      aria-labelledby="featured-items"
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-foreground/10">
        <h2 id="featured-items" className="uppercase">
          Trends
        </h2>
        <p className="text-foreground/20 tracking-widest">Last 5 items</p>
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        {featuredItems.length ? (
          featuredItems.map((item) => {
            const media = item.movie || item.serial;
            if (!media) return null;

            return (
              <div key={item.id} className="flex gap-4">
                <div className="max-w-16 aspect-3/4 rounded-sm overflow-hidden">
                  <Image
                    src={media.image}
                    alt={media.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <h3>{media.title}</h3>
                    <p className="text-foreground/20">
                      {"budget" in media ? media.budget : media.badge}
                    </p>
                    <p>{new Date(media.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="flex justify-center items-center h-fit gap-2">
                      <Star
                        size={15}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      {Number(media.rating).toFixed(1)}
                    </span>
                    <span className="text-foreground/25">
                      {"votesCount" in media ? media.votesCount : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <span className="flex justify-center text-foreground/20">
            there is no items in db
          </span>
        )}
      </div>
    </section>
  );
};
