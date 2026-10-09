import Image from "next/image";

export const RegisterBackground = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/backdrop.webp"
        alt="create an account in cinmax"
        priority
        width={1920}
        height={1080}
        loading="eager"
        className="w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/30 via-background/50 to-background" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60" />
    </div>
  );
};
