import { RegisterForm } from "@/features/client";
import { Logo, RegisterBackground, RegisterContent } from "@/features/server";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex flex-col relative w-1/2 overflow-hidden">
        <RegisterBackground />
        <RegisterContent />
      </div>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-16 py-12 relative w-full">
        <Logo className="md:hidden mb-8" />
        <RegisterForm />
      </div>
    </div>
  );
}
