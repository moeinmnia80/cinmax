interface PasswordStrengthProps {
  score: number;
}

export const PasswordStrengthBars = ({ score }: PasswordStrengthProps) => {
  const getBarColor = (index: number) => {
    if (index >= score) return "bg-foreground/10";

    if (score === 1) return "bg-red-500";
    if (score === 2) return "bg-orange-500";
    if (score === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-1.5 mt-2">
      <div className="grid grid-cols-4 gap-1.5 px-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`h-0.5 rounded-full transition-all duration-300 ${getBarColor(index)} ${score ? "visible" : "invisible"}`}
          />
        ))}
      </div>
    </div>
  );
};
