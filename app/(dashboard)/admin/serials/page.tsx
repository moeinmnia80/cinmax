import { getSerials } from "./actions";
import { SerialsTable } from "./_components/SerialsTable";

interface SerialsPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function SerialsPage({ searchParams }: SerialsPageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const page = Number(params.page ?? "1") || 1;

  const { serials, total, pageCount } = await getSerials({ search, page });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Serials
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Manage TV/web series — same idea as Movies, no seasons/episode
          breakdown yet (just counters).
        </p>
      </div>

      <SerialsTable
        serials={serials}
        total={total}
        page={page}
        pageCount={pageCount}
        search={search}
      />
    </div>
  );
}
