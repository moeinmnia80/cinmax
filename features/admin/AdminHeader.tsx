interface AdminHeaderProps {
  title: string;
  desc: string;
}

export function AdminHeader({
  title = "test",
  desc = "this is test phrase",
}: AdminHeaderProps) {
  return (
    <div className="border-b border-foreground/10 py-5 px-4 animate-slide-down">
      <h1 className="text-2xl font-black text-white uppercase tracking-wide">
        {title}
      </h1>
      <p className="text-foreground/40 text-sm font-light tracking-widest">
        {desc}
      </p>
    </div>
  );
}
