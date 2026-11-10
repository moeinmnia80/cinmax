import { Reveal } from "@moeinmnia/motion/react";
import Image from "next/image";

interface Props {
  image?: string;
  title?: string;
}

export const SerialHeroPoster = ({ image, title }: Props) => {
  return (
    <>
      <Reveal variant="left">
        {image && (
          <div className="relative w-48 lg:w-60 aspect-2/3 rounded-2xl overflow-hidden border border-foreground/10">
            <Image
              src={image}
              alt={title ?? "poster"}
              className="object-cover"
              fill
              fetchPriority="high"
              priority
            />
          </div>
        )}
      </Reveal>
    </>
  );
};
