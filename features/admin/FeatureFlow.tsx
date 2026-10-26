interface FeaturedFlowProps {
  total: number;
  movies: number;
  serials: number;
}

const ROW = 56;
const GAP = 8;
const H = ROW * 2 + GAP; // 120
const W = 64;
const MID = H / 2;
const Y_MOVIES = ROW / 2;
const Y_SERIALS = ROW + GAP + ROW / 2;

const Branch = ({
  toY,
  color,
  muted,
}: {
  toY: number;
  color: string;
  muted: boolean;
}) => {
  const endX = W - 8; // leave room for the arrowhead
  const stroke = muted ? "currentColor" : color;

  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={muted ? 0.25 : 1}
      strokeDasharray={muted ? "4 4" : undefined}
    >
      {/* curve out of the Featured number, into the row */}
      <path
        d={`M2 ${MID} C ${W * 0.55} ${MID}, ${W * 0.4} ${toY}, ${endX} ${toY}`}
      />
      {/* arrowhead */}
      <path
        d={`M${endX - 4} ${toY - 5} L${endX + 4} ${toY} L${endX - 4} ${toY + 5}`}
        strokeDasharray="none"
      />
    </g>
  );
};

export const FeaturedFlow = ({ total, movies, serials }: FeaturedFlowProps) => (
  <div className="flex items-center gap-1" style={{ height: H }}>
    <div className="flex flex-col items-center min-w-16">
      <p className="text-sm text-foreground/50">Featured</p>
      <p className="mt-1 text-4xl font-black tabular-nums">{total}</p>
    </div>

    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="shrink-0 text-foreground"
      aria-hidden
    >
      <Branch toY={Y_MOVIES} color="var(--chart-gold)" muted={movies === 0} />
      <Branch toY={Y_SERIALS} color="var(--chart-blue)" muted={serials === 0} />
    </svg>

    <dl className="flex flex-col" style={{ gap: GAP }}>
      {[
        { label: "Movies", value: movies },
        { label: "Serials", value: serials },
      ].map(({ label, value }) => (
        <div
          key={label}
          className={`flex items-center gap-3 ${value === 0 ? "opacity-50" : ""}`}
          style={{ height: ROW }}
        >
          <dd className="w-8 text-3xl font-black tabular-nums">{value}</dd>
          <dt className="text-sm text-foreground/50">{label}</dt>
        </div>
      ))}
    </dl>
  </div>
);
