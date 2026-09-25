export const LoginStats = () => {
  return (
    <div className="flex gap-8 mb-10">
      {[
        { value: "10K+", label: "Titles" },
        { value: "4K", label: "Ultra HD" },
        { value: "180+", label: "Countries" },
      ].map(({ value, label }) => (
        <div key={label}>
          <p className="text-white font-black text-3xl leading-none">{value}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};
