interface AdminHeaderProps extends Partial<Pick<HTMLDivElement, "className">> {
  title: string;
  desc: string;
  children?: React.ReactNode;
}

export function AdminHeader({
  children,
  className,
  title = "test",
  desc = "this is test phrase",
}: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-foreground/10 py-5 px-4 animate-slide-down">
      <div className="flex flex-col">
        <h1 className="text-2xl font-black text-foreground uppercase tracking-wide">
          {title}
        </h1>
        <p className="text-foreground/40 text-sm font-light tracking-widest">
          {desc}
        </p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}
