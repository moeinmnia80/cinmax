import "server-only";
export interface AdminCardItem {
  label: string;
  value: PromiseSettledResult<number | string>;
  className?: string;
  addedThisWeek?: number;
  lastChange?: Date | null;
}

const formatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

interface AdminCardProps {
  fetchCards: () => Promise<AdminCardItem[]>;
}
export const AdminCard = async ({ fetchCards }: AdminCardProps) => {
  const cards = await fetchCards();

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-1 animate-slide-up rounded-2xl">
      <div className="absolute -z-10 top-1/2 left-1/3 size-50 bg-destructive blur-[250px]" />
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative rounded-xl border border-foreground/10 bg-foreground/5 p-5 overflow-hidden group *:cursor-default backdrop-blur-2xl"
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
          {card.addedThisWeek ? (
            <p
              className={`relative z-10 mt-1 text-xs ${card.addedThisWeek > 0 ? "text-emerald-500" : "text-foreground/30"}`}
            >
              +{card.addedThisWeek} this week
            </p>
          ) : (
            <span className="block h-4 mt-1" />
          )}
          {card.lastChange !== undefined && (
            <p className="relative z-10 mt-1 text-xs text-foreground/30">
              {card.lastChange
                ? `Last change: ${formatter.format(card.lastChange)}`
                : "No changes yet"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
