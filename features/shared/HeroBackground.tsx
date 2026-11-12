import Image from "next/image";
interface Props {
  backdrop?: string | null;
  title?: string;
}
export const HeroBackground = ({ backdrop, title }: Props) => {
  return (
    <>
      {backdrop && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={backdrop}
            alt={title ?? "backdrop"}
            className="size-full object-cover opacity-30"
            fill
            priority
          />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/80 to-background/30" />
    </>
  );
};
