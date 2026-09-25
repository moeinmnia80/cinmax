import {
  Logo,
  LoginStats,
  LoginShowCase,
  LoginTestImonial,
} from "@/features/server";

export const LoginMovieCards = () => {
  return (
    <div className="relative z-10 flex-1 flex items-center px-12">
      <div>
        <Logo />
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-5">
          Now Streaming
        </p>
        <LoginShowCase />
        <LoginStats />
        <LoginTestImonial />
      </div>
    </div>
  );
};
