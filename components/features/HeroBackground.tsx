import Image from "next/image";

export const HeroBackground = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-dvh overflow-hidden">
      <Image
        src="https://res.cloudinary.com/imsawsxo/image/upload/v1789976645/62cdbae108f3b.webp"
        className="w-full h-full object-cover transition-all duration-700 object-[70%]"
        width={1920}
        height={1080}
        loading="eager"
        alt="banner"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-transparent to-black/30" />
    </div>
  );
};
