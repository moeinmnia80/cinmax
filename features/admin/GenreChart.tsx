import { use } from "react";

import type { GenreStatsData } from "@/data/dashboard";

const SIZE = 340;
const C = SIZE / 2;
const R_OUT = 164;
const R_IN = 104;
const R_MID = (R_OUT + R_IN) / 2;
const GAP = 4;
const MIN_LABEL_PERCENT = 4;

const polar = (r: number, a: number) =>
  [C + r * Math.cos(a), C + r * Math.sin(a)] as const;

function sector(a0: number, a1: number) {
  const [x1, y1] = polar(R_OUT, a0);
  const [x2, y2] = polar(R_OUT, a1);
  const [x3, y3] = polar(R_IN, a1);
  const [x4, y4] = polar(R_IN, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;

  return `M${x1} ${y1} A${R_OUT} ${R_OUT} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${R_IN} ${R_IN} 0 ${large} 0 ${x4} ${y4}Z`;
}

const shade = (index: number, count: number) => {
  const strength = count > 1 ? 100 - (index / (count - 1)) * 62 : 100;
  return {
    strength,
    fill: `color-mix(in srgb, var(--foreground) ${strength}%, var(--background))`,
  };
};

interface GenreChartProps {
  data: Promise<GenreStatsData>;
  size?: number;
}

export const GenreChart = ({ data, size = 340 }: GenreChartProps) => {
  const { titles, items } = use(data);
  const total = items.reduce((sum, item) => sum + item.count, 0);

  const slices = items.map((item, i) => {
    const before = items.slice(0, i).reduce((sum, x) => sum + x.count, 0);
    const a0 = -Math.PI / 2 + (before / total) * Math.PI * 2;
    const a1 = Math.min(
      a0 + (item.count / total) * Math.PI * 2,
      -Math.PI / 2 + Math.PI * 2 - 0.001,
    );
    const [lx, ly] = polar(R_MID, (a0 + a1) / 2);

    return { ...item, path: sector(a0, a1), lx, ly, ...shade(i, items.length) };
  });

  return (
    <section
      aria-labelledby="genre-chart"
      className="col-span-1 sm:col-span-2 rounded-2xl border border-foreground/20 bg-foreground/5 animate-scale-in"
    >
      {items.length ? (
        <div className="flex flex-col items-center gap-1 h-full p-1 md:items-stretch md:flex-row md:justify-between">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            width={size}
            height={size}
            style={{ maxWidth: "100%", height: "auto" }}
            className="shrink-0"
            role="img"
            aria-label={`Genre share: ${slices.map((s) => `${s.genre} ${s.percent}%`).join(", ")}`}
          >
            {slices.map((s) => (
              <path key={s.genre} d={s.path} fill={s.fill} strokeWidth={GAP}>
                <title>{`${s.genre}: ${s.percent}% (${s.count})`}</title>
              </path>
            ))}

            {slices.map((s) =>
              s.percent < MIN_LABEL_PERCENT ? null : (
                <text
                  key={s.genre}
                  x={s.lx}
                  y={s.ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`pointer-events-none text-[17px] ${s.strength >= 60 ? "fill-background" : "fill-foreground"}`}
                >
                  {s.percent}%
                </text>
              ),
            )}

            <text
              x={C}
              y={C - 6}
              textAnchor="middle"
              className="fill-foreground text-[52px] font-bold tabular-nums"
            >
              {titles}
            </text>
            <text
              x={C}
              y={C + 28}
              textAnchor="middle"
              className="fill-foreground/50 text-[18px]"
            >
              Total titles
            </text>
          </svg>

          <ul className="flex flex-col justify-between w-full gap-1 bg-background border border-foreground/10 rounded-xl p-3">
            {slices.map((s) => (
              <li key={s.genre} className="flex items-center gap-1">
                <span
                  className="size-3 rounded-[3px] border border-foreground/10"
                  style={{ backgroundColor: s.fill }}
                  aria-hidden
                />
                <span className="flex-1 capitalize text-foreground/70">
                  {s.genre}
                </span>
                <span className="font-semibold tabular-nums">{s.percent}%</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="flex justify-center py-10 text-foreground/20">
          there are no genres in db
        </span>
      )}
    </section>
  );
};
