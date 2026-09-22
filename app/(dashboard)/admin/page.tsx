import Link from "next/link";
import { Clapperboard, Tags, Globe2, Building2 } from "lucide-react";

// Adjust to your actual Prisma client path.
import db from "@/lib/db";

async function getStats() {
  const [movieCount, genreCount, languageCount, studioCount] =
    await Promise.all([
      db.movie.count(),
      db.genre.count(),
      db.language.count(),
      db.studio.count(),
    ]);
  return { movieCount, genreCount, languageCount, studioCount };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Movies",
      value: stats.movieCount,
      icon: Clapperboard,
      href: "/admin/movies",
    },
    {
      label: "Genres",
      value: stats.genreCount,
      icon: Tags,
      href: "/admin/metadata",
    },
    {
      label: "Languages",
      value: stats.languageCount,
      icon: Globe2,
      href: "/admin/metadata",
    },
    {
      label: "Studios",
      value: stats.studioCount,
      icon: Building2,
      href: "/admin/metadata",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wide">
          Dashboard
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Overview of the Cinemax catalog.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <card.icon className="text-primary mb-3" size={20} />
            <p className="text-3xl font-black text-white">{card.value}</p>
            <p className="text-white/40 text-sm mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-2">
          Coming next
        </h2>
        <ul className="text-white/50 text-sm space-y-1 list-disc list-inside">
          <li>Cast &amp; crew management per movie</li>
          <li>Download links, subtitles &amp; audio tracks</li>
          <li>Gallery images and reviews</li>
          <li>Serials (same pattern as Movies)</li>
          <li>Admin authentication / access control</li>
        </ul>
      </div>
    </div>
  );
}
