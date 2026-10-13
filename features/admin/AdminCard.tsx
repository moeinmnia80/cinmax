import "server-only";
export interface AdminCardItem {
  label: string;
  value: PromiseSettledResult<number | string>;
}

interface AdminCardProps {
  fetchCards: () => Promise<AdminCardItem[]>;
}
export const AdminCard = async ({ fetchCards }: AdminCardProps) => {
  const cards = await fetchCards();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-5 px-4 animate-slide-down">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative rounded-xl border border-white/10 bg-card p-5 hover:border-foreground/40 transition-colors overflow-hidden group"
        >
          <p className="text-foreground/30 tracking-widest uppercase">
            {card.label}
          </p>
          {card.value.status === "fulfilled" ? (
            <p className="text-3xl font-black text-white">{card.value.value}</p>
          ) : (
            "?"
          )}
          <p className="absolute -right-3 -bottom-3 text-white/5 text-7xl font-bold group-hover:text-foreground/40 transition-all duration-200">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
};
