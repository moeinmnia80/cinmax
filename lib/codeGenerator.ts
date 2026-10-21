const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
  fallback: "none",
});
const languageNames = new Intl.DisplayNames(["en"], {
  type: "language",
  fallback: "none",
});

const COUNTRY_ALIASES: Record<string, string> = {
  usa: "US",
  "united states of america": "US",
  uk: "GB",
  england: "GB",
  korea: "KR",
  russia: "RU",
  turkey: "TR",
  iran: "IR",
};

function buildMap(names: Intl.DisplayNames, upper: boolean) {
  const map = new Map<string, string>();
  const letters = "abcdefghijklmnopqrstuvwxyz";
  for (const a of letters) {
    for (const b of letters) {
      const code = upper ? (a + b).toUpperCase() : a + b;
      try {
        const name = names.of(code);
        if (name) map.set(name.toLowerCase(), code);
      } catch {}
    }
  }
  return map;
}

let countryMap: Map<string, string> | null = null;
let languageMap: Map<string, string> | null = null;

export function getCountryCode(name: string): string | null {
  const key = name.trim().toLowerCase();
  if (!key) return null;
  countryMap ??= buildMap(regionNames, true);
  return COUNTRY_ALIASES[key] ?? countryMap.get(key) ?? null; // "south korea" → "KR"
}

export function getLanguageCode(name: string): string | null {
  const key = name.trim().toLowerCase();
  if (!key) return null;
  languageMap ??= buildMap(languageNames, false);
  return languageMap.get(key) ?? null; // "korean" → "ko", "persian" → "fa"
}
