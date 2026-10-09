import {
  Logo,
  RegisterContentInfo,
  RegisterFeatureList,
} from "@/features/server";

export const RegisterContent = () => {
  return (
    <div className="relative z-10 flex-1 flex flex-col justify-center px-12">
      <Logo />
      <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">
        Join the Community
      </p>
      <h2 className="text-5xl font-black text-white uppercase leading-none mb-6">
        Unlimited
        <br />
        Cinema<span className="text-destructive">.</span>
      </h2>
      <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-10">
        Stream 10,000+ films and series in 4K Ultra HD. Earn League points.
        Share with a community of film lovers.
      </p>
      <RegisterFeatureList />
      <RegisterContentInfo />
    </div>
  );
};
