import { Suspense } from "react";

import { SerialHeroSection } from "@/features/serials/SerialHeroSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function SerialDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<></>}>
      <SerialHeroSection params={params} />
    </Suspense>
  );
}
