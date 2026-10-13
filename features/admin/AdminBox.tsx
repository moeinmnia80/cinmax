import "server-only";
import { Suspense } from "react";

import db from "@/lib/db";
import { MovieList } from "./MovieList";
import { SerialList } from "./SerialList";
import { cacheLife, cacheTag } from "next/cache";
import { AdminBoxSkeleton } from "./AdminBoxSkeleton";

export const AdminBox = async () => {
  "use cache";
  cacheTag("dashboard-boxes");
  cacheLife("hours");

  const moviesPromise = db.movie.findMany({
    orderBy: { createdAt: "asc" },
    take: 5,
    skip: 0,
  });

  const serialsPromise = db.serial.findMany({
    orderBy: { createdAt: "asc" },
    take: 5,
    skip: 0,
  });

  return (
    <>
      <Suspense fallback={<AdminBoxSkeleton />}>
        <MovieList data={moviesPromise} />
      </Suspense>
      <Suspense fallback={<AdminBoxSkeleton />}>
        <SerialList data={serialsPromise} />
      </Suspense>
    </>
  );
};
