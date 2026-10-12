import Link from "next/link";

export const AdminSidebarHeader = () => {
  return (
    <Link
      href="/admin"
      className="flex items-center gap-3 py-5 px-4 border-b border-foreground/10"
    >
      <p className="grid place-items-center size-8 text-background bg-destructive font-bold text-xl shrink-0 rounded-md">
        C
      </p>
      <div className="uppercase tracking-widest">
        <p className="text-foreground text-lg uppercase font-bold leading-4">
          cinmax
        </p>
        <p className="text-foreground/30 text-sm uppercase leading-4">
          control desk
        </p>
      </div>
    </Link>
  );
};
