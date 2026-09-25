import Image from "next/image";

export async function LoginBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/backdrop.webp"
        alt="background login page"
        priority
        width={1920}
        height={1080}
        className="w-full h-full object-cover transition-all duration-700 object-[70%] opacity-25"
        loading="eager"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/20 via-background/40 to-background" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60" />
    </div>
  );
}
