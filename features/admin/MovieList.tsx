import { use } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { DashboardMovie } from "@/data/dashboard";

export const MovieList = ({ data }: { data: Promise<DashboardMovie[]> }) => {
  const movies = use(data);

  return (
    <section className="col-span-1 bg-foreground/5 rounded-md border border-foreground/10 animate-scale-in">
      <div className="flex items-center justify-between px-4 py-5 border-b border-foreground/10">
        <h2 className="uppercase">movies</h2>
        <p className="text-foreground/20 tracking-widest">Last 5 movies</p>
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        {movies.length ? (
          movies.map((movie) => (
            <div key={movie.id} className="flex items-center gap-4">
              <div className="max-w-16 aspect-3/4 rounded-sm overflow-hidden">
                <Image
                  src={movie.image}
                  alt={`${movie.title}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <h3 className="capitalize line-clamp-1 pr-10">
                    {movie.title}
                  </h3>
                  <p className="text-foreground/20">
                    {movie.budget?.toLocaleString()}
                  </p>
                  <p>{movie.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <span className="flex justify-center items-center h-fit gap-2">
                    <Star
                      size={15}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    {movie.rating.toFixed(1)}
                  </span>
                  <span className="text-foreground/20">{movie.votesCount}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="flex justify-center text-foreground/20">
            there is no movies in db
          </span>
        )}
      </div>
    </section>
  );
};
