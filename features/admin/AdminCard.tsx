import "server-only";
export interface AdminCardItem {
  label: string;
  value: PromiseSettledResult<number | string>;
  className?: string;
}

interface AdminCardProps {
  fetchCards: () => Promise<AdminCardItem[]>;
}
export const AdminCard = async ({ fetchCards }: AdminCardProps) => {
  const cards = await fetchCards();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-down">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative rounded-md border border-foreground/10 bg-card p-5 hover:border-foreground/40 transition-colors overflow-hidden group *:cursor-default"
        >
          <p className="text-xs tracking-widest uppercase text-foreground/30">
            {card.label}
          </p>
          {card.value.status === "fulfilled" ? (
            <p
              className={`relative text-3xl font-black z-10 ${card?.className ? card.className : "text-foreground"}`}
            >
              {card.value.value}
            </p>
          ) : (
            "?"
          )}
          <p className="absolute -right-3 -bottom-3 text-foreground/5 text-7xl font-bold group-hover:text-foreground/15 transition-all duration-200">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
};
