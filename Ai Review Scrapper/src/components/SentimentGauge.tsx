import { useEffect, useState } from "react";

interface SentimentGaugeProps {
  positive: number;
  neutral: number;
  negative: number;
}

export const SentimentGauge = ({ positive, neutral, negative }: SentimentGaugeProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, [positive, neutral, negative]);

  const total = positive + neutral + negative;
  const positivePercent = total > 0 ? (positive / total) * 100 : 0;
  const neutralPercent = total > 0 ? (neutral / total) * 100 : 0;
  const negativePercent = total > 0 ? (negative / total) * 100 : 0;

  const overallScore = total > 0 ? ((positive * 100 + neutral * 50) / total).toFixed(0) : 0;

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <span className="text-lg">🧠</span>
          AI Sentiment Analysis
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold gradient-text">{overallScore}%</span>
          <span className="text-xs text-muted-foreground">positive</span>
        </div>
      </div>

      {/* Sentiment Bar */}
      <div className="h-3 rounded-full bg-secondary overflow-hidden flex mb-4">
        <div
          className="h-full bg-success transition-all duration-1000 ease-out"
          style={{ width: animated ? `${positivePercent}%` : "0%" }}
        />
        <div
          className="h-full bg-warning transition-all duration-1000 ease-out delay-150"
          style={{ width: animated ? `${neutralPercent}%` : "0%" }}
        />
        <div
          className="h-full bg-destructive transition-all duration-1000 ease-out delay-300"
          style={{ width: animated ? `${negativePercent}%` : "0%" }}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-success/10">
          <p className="text-lg font-bold text-success">{positive}</p>
          <p className="text-xs text-muted-foreground">Positive</p>
        </div>
        <div className="p-2 rounded-lg bg-warning/10">
          <p className="text-lg font-bold text-warning">{neutral}</p>
          <p className="text-xs text-muted-foreground">Neutral</p>
        </div>
        <div className="p-2 rounded-lg bg-destructive/10">
          <p className="text-lg font-bold text-destructive">{negative}</p>
          <p className="text-xs text-muted-foreground">Negative</p>
        </div>
      </div>
    </div>
  );
};
