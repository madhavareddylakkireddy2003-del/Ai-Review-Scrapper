import { cn } from "@/lib/utils";

interface SourceCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  selected: boolean;
  onClick: () => void;
  colorClass: string;
}

export const SourceCard = ({
  name,
  icon,
  description,
  selected,
  onClick,
  colorClass,
}: SourceCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? `border-${colorClass} bg-${colorClass}/10 shadow-lg`
          : "border-border bg-card hover:border-muted-foreground/30",
        colorClass
      )}
      style={{
        borderColor: selected ? `hsl(var(--${colorClass}-color))` : undefined,
        backgroundColor: selected ? `hsl(var(--${colorClass}-color) / 0.1)` : undefined,
        boxShadow: selected ? `0 0 30px -10px hsl(var(--${colorClass}-color) / 0.5)` : undefined,
      }}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
          selected ? "scale-110" : ""
        )}
        style={{
          backgroundColor: `hsl(var(--${colorClass}-color) / 0.15)`,
          color: `hsl(var(--${colorClass}-color))`,
        }}
      >
        {icon}
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      {selected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `hsl(var(--${colorClass}-color))` }}
        >
          <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};
