export const HeroBackgroundLoading = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-dvh overflow-hidden bg-gray-300/20">
      <div className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/95 via-transparent to-black/30" />
    </div>
  );
};
