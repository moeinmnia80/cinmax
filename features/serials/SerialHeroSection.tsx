import { use } from "react";

import { getSerial } from "@/data/serial";
import { SerialHero } from "@/features/serials/SerialHero";

interface Props {
  params: Promise<{ slug: string }>;
}

export function SerialHeroSection({ params }: Props) {
  const { slug } = use(params);
  const serial = getSerial(slug);

  return <SerialHero data={serial} />;
}
