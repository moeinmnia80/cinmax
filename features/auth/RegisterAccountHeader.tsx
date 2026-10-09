import Link from "next/link";

export const RegisterAccountHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black text-white uppercase leading-tight mb-1">
        Create Account
      </h1>
      <p className="text-white/40 text-sm">
        Already have one?{" "}
        <Link
          href="/login"
          className="text-destructive hover:text-destructive/40 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
