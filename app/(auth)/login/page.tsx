import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LoginForm } from "@/features/client";
import {
  LoginBackground,
  LoginFormHeader,
  LoginMovieCards,
  LoginFormDivider,
  LoginOAuthMethods,
} from "@/features/server";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex flex-col relative w-[55%] overflow-hidden">
        <LoginBackground />
        <LoginMovieCards />
      </div>
      <div className="flex-1 flex flex-col justify-center px-8 py-12 relative">
        <div className="w-full max-w-md">
          <LoginFormHeader />
          <LoginForm />
          <LoginFormDivider />
          <LoginOAuthMethods />

          <p className="flex items-center justify-center gap-2 text-center text-white/30 text-sm mt-8">
            <span>New to Cinemax?</span>
            <Link
              href="/register"
              className="flex items-center gap-1 text-destructive hover:text-red-400 transition-colors font-medium"
            >
              Create account <ArrowRight size={13} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
