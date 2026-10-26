import "server-only";
import { Suspense, use } from "react";

import { AdminBoxSkeleton } from "@/features/server";
import { getFeaturedSummary, type FeaturedSummaryData } from "@/data/dashboard";
import { FeaturedFlow } from "./FeatureFlow";
import Image from "next/image";
import { Star } from "lucide-react";

const formatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

const Detail = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <dt className="text-sm text-foreground/50">{label}</dt>
    <dd className="mt-0.5 font-medium">{children}</dd>
  </div>
);

function Summary({ data }: { data: Promise<FeaturedSummaryData> }) {
  const s = use(data);

  return (
    <section
      aria-labelledby="featured-summary"
      className="col-span-1 sm:col-span-1 rounded-2xl border border-foreground/20 bg-foreground/5 animate-scale-in p-1"
    >
      {s.total ? (
        <div className="flex flex-col items-center justify-between gap-4 bg-background border border-foreground/10 hover:border-foreground/40 transition duration-200 rounded-xl p-3">
          <FeaturedFlow total={s.total} movies={s.movies} serials={s.serials} />
          <div className="self-start">
            <h2 className="uppercase text-foreground/70 text-xs underline underline-offset-4">
              last item
            </h2>
            {s.lastAdded ? (
              <div className="flex flex-col mt-2">
                <span className="text-md truncate capitalize">
                  {s.lastAdded.title}
                </span>
                <span className="text-sm font-normal text-foreground/40">
                  {s.lastAdded.ago}
                </span>
              </div>
            ) : (
              "None"
            )}
          </div>
        </div>
      ) : (
        <p className="px-4 py-10 text-center text-foreground/30">
          Nothing is featured yet.
        </p>
      )}
    </section>
  );
}

export const FeaturedSummary = () => {
  const summary = getFeaturedSummary();

  return (
    <Suspense fallback={<AdminBoxSkeleton />}>
      <Summary data={summary} />
    </Suspense>
  );
};
