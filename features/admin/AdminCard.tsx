import "server-only";
import Link from "next/link";

import { getCards } from "@/constants/adminCards";
import { cacheLife, cacheTag } from "next/cache";

export const AdminCard = async () => {
  "use cache";
  cacheTag("dashboard-cards");
  cacheLife("hours");

  const cards = await getCards();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-5 px-4">
      {cards.map((card) => (
        <Link
          key={card.label}
          href={card.href}
          prefetch={false}
          className="relative rounded-xl border border-white/10 bg-card p-5 hover:border-foreground/40 transition-colors overflow-hidden group"
        >
          <p className="text-foreground/30 tracking-widest">{card.label}</p>
          {card.value.status === "fulfilled" ? (
            <p className="text-3xl font-black text-white">{card.value.value}</p>
          ) : (
            "?"
          )}
          <p className="absolute -right-3 -bottom-3 text-white/5 text-7xl font-bold group-hover:text-foreground/40 transition-all duration-200">
            {card.label}
          </p>
        </Link>
      ))}
    </div>
  );
};
