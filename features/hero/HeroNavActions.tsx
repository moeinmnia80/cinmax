"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut, MenuIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getData } from "@/lib/axios";
import { logoutAction } from "@/app/actions/auth";
import { useModalStore } from "@/store/useModalStore";

export const HeroNavActions = () => {
  const setMobileNavOpen = useModalStore((state) => state.toggleMobileNav);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user-me"],
    queryFn: () => getData("/api/user/me"),
    refetchOnWindowFocus: false,
  });

  const handleLogout = async () => {
    const result = await logoutAction();

    if (result?.success) {
      await queryClient.invalidateQueries({ queryKey: ["user-me"] });
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {!isLoading ? (
        data?.user ? (
          <div className="hidden sm:flex items-center gap-2">
            {data?.user?.image ? (
              <Image
                src={data.user.image}
                alt="User avatar"
                loading="eager"
                width={36}
                height={36}
                priority
                className="size-9 rounded-full object-cover border-2 border-foreground/15"
              />
            ) : (
              <span className="size-9 rounded-full bg-gray-200/10 border border-destructive/50" />
            )}
            {data?.user?.username && (
              <span className="text-white/80 text-sm font-medium cursor-default underline decoration-transparent underline-offset-3 hover:decoration-foreground transition-all duration-200">
                {data?.user.username}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="text-white/30 hover:text-destructive transition-colors px-1"
            >
              <LogOut size={13} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden sm:block text-white/50 hover:text-white text-sm transition-colors px-1"
            >
              Login
            </Link>
            <span className="hidden sm:block text-white/20 text-sm">/</span>
            <Link
              href="/register"
              className="hidden sm:block text-white/50 hover:text-white text-sm transition-colors px-1"
            >
              Register
            </Link>
          </>
        )
      ) : (
        <div className="min-w-30 h-10" />
      )}

      <button
        onClick={() => setMobileNavOpen(true)}
        className="sm:hidden size-9 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:border-white/40 hover:text-white transition-all"
      >
        <MenuIcon size={16} />
      </button>
    </div>
  );
};
