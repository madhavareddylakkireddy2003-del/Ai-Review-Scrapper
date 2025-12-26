import { useMemo } from "react";

interface TimelineChartProps {
  reviews: { date: string; rating: number }[];
}

export const TimelineChart = ({ reviews }: TimelineChartProps) => {
  const chartData = useMemo(() => {
    const grouped: Record<string, { count: number; totalRating: number }> = {};
    
    reviews.forEach((r) => {
      const month = r.date.slice(0, 7); // YYYY-MM
      if (!grouped[month]) {
        grouped[month] = { count: 0, totalRating: 0 };
      }
      grouped[month].count++;
      grouped[month].totalRating += r.rating;
    });

    return Object.entries(grouped)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, data]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        count: data.count,
        avgRating: data.totalRating / data.count,
      }));
  }, [reviews]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-lg">📈</span>
        Review Timeline
      </h3>
      
      {chartData.length > 0 ? (
        <div className="flex items-end justify-between gap-1 h-32">
          {chartData.map((data, index) => (
            <div
              key={data.month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="w-full flex flex-col items-center">
                <span className="text-xs font-medium text-primary mb-1">{data.count}</span>
                <div
                  className="w-full bg-gradient-to-t from-primary/80 to-primary rounded-t-sm transition-all duration-500 ease-out hover:from-accent/80 hover:to-accent cursor-pointer"
                  style={{
                    height: `${(data.count / maxCount) * 80}px`,
                    animationDelay: `${index * 100}ms`,
                  }}
                  title={`${data.count} reviews, avg rating: ${data.avgRating.toFixed(1)}`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">{data.month}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No timeline data</p>
        </div>
      )}
    </div>
  );
};
