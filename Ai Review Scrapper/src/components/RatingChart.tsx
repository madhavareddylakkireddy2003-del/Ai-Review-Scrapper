import { useMemo } from "react";
import { Star } from "lucide-react";

interface RatingChartProps {
  reviews: { rating: number }[];
}

export const RatingChart = ({ reviews }: RatingChartProps) => {
  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        counts[r.rating - 1]++;
      }
    });
    return counts;
  }, [reviews]);

  const maxCount = Math.max(...distribution, 1);
  const total = reviews.length;
  const avgRating = total > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) 
    : "0.0";

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <span className="text-lg">⭐</span>
          Rating Distribution
        </h3>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-warning text-warning" />
          <span className="text-xl font-bold text-foreground">{avgRating}</span>
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating - 1];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const barWidth = (count / maxCount) * 100;

          return (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm font-medium text-foreground">{rating}</span>
                <Star className="w-3 h-3 text-warning fill-warning" />
              </div>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-12 text-right">
                {percentage.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
