import { Star } from "lucide-react";

interface Review {
  title: string;
  description: string;
  date: string;
  reviewer?: string;
  rating?: number;
  source: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

export const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "g2":
        return "g2";
      case "capterra":
        return "capterra";
      case "trustpilot":
        return "trustpilot";
      default:
        return "primary";
    }
  };

  const sourceColor = getSourceColor(review.source);

  return (
    <div
      className="glass-card rounded-xl p-5 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground line-clamp-1">{review.title}</h4>
          <div className="flex items-center gap-3 mt-1.5">
            {review.reviewer && (
              <span className="text-xs text-muted-foreground">{review.reviewer}</span>
            )}
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `hsl(var(--${sourceColor}-color) / 0.15)`,
            color: `hsl(var(--${sourceColor}-color))`,
          }}
        >
          {review.source}
        </span>
      </div>

      {review.rating && (
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating! ? "fill-warning text-warning" : "text-muted"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">{review.rating}/5</span>
        </div>
      )}

      <p className="text-sm text-muted-foreground line-clamp-3">{review.description}</p>
    </div>
  );
};
