import { useMemo } from "react";

interface WordCloudProps {
  reviews: { description: string }[];
}

export const WordCloud = ({ reviews }: WordCloudProps) => {
  const words = useMemo(() => {
    const stopWords = new Set([
      "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with",
      "by", "from", "as", "is", "was", "are", "were", "been", "be", "have", "has", "had",
      "do", "does", "did", "will", "would", "could", "should", "may", "might", "must",
      "this", "that", "these", "those", "it", "its", "we", "our", "they", "their", "i",
      "you", "your", "he", "she", "him", "her", "my", "me", "us", "them", "what", "which",
      "who", "whom", "when", "where", "why", "how", "all", "each", "every", "both", "few",
      "more", "most", "other", "some", "such", "no", "not", "only", "same", "so", "than",
      "too", "very", "can", "just", "now", "also", "into", "out", "up", "down", "been",
    ]);

    const wordCount: Record<string, number> = {};
    
    reviews.forEach((review) => {
      const text = review.description.toLowerCase().replace(/[^\w\s]/g, "");
      const words = text.split(/\s+/);
      
      words.forEach((word) => {
        if (word.length > 3 && !stopWords.has(word)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });

    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));
  }, [reviews]);

  const maxCount = Math.max(...words.map((w) => w.count), 1);

  const getWordStyle = (count: number, index: number) => {
    const ratio = count / maxCount;
    const size = 0.7 + ratio * 1.3;
    const opacity = 0.5 + ratio * 0.5;
    
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--accent))",
      "hsl(var(--success))",
      "hsl(var(--capterra-color))",
      "hsl(var(--trustpilot-color))",
    ];
    
    return {
      fontSize: `${size}rem`,
      opacity,
      color: colors[index % colors.length],
      animationDelay: `${index * 50}ms`,
    };
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-lg">☁️</span>
        Keyword Cloud
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-3 min-h-[120px]">
        {words.length > 0 ? (
          words.map(({ word, count }, index) => (
            <span
              key={word}
              className="font-semibold cursor-default hover:scale-110 transition-transform duration-200 animate-fade-in"
              style={getWordStyle(count, index)}
              title={`${count} mentions`}
            >
              {word}
            </span>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No data yet</p>
        )}
      </div>
    </div>
  );
};
