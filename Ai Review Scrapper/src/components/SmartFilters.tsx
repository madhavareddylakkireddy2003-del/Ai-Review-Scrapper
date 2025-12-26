import { Search, Filter, Star, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SmartFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  ratingFilter: number | null;
  onRatingFilter: (rating: number | null) => void;
  sentimentFilter: "all" | "positive" | "neutral" | "negative";
  onSentimentFilter: (sentiment: "all" | "positive" | "neutral" | "negative") => void;
}

export const SmartFilters = ({
  searchQuery,
  onSearchChange,
  ratingFilter,
  onRatingFilter,
  sentimentFilter,
  onSentimentFilter,
}: SmartFiltersProps) => {
  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground text-sm">Smart Filters</h3>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reviews..."
          className="pl-9 h-10 bg-secondary border-border"
        />
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Filter by Rating</p>
        <div className="flex gap-1">
          {[null, 5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating ?? "all"}
              variant={ratingFilter === rating ? "default" : "ghost"}
              size="sm"
              onClick={() => onRatingFilter(rating)}
              className="flex-1 h-8 text-xs"
            >
              {rating === null ? (
                "All"
              ) : (
                <span className="flex items-center gap-0.5">
                  {rating}
                  <Star className="w-3 h-3 fill-warning text-warning" />
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Sentiment Filter */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Filter by Sentiment</p>
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant={sentimentFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSentimentFilter("all")}
            className="h-8 text-xs"
          >
            All
          </Button>
          <Button
            variant={sentimentFilter === "positive" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSentimentFilter("positive")}
            className="h-8 text-xs"
          >
            <TrendingUp className="w-3 h-3 mr-1 text-success" />
            Good
          </Button>
          <Button
            variant={sentimentFilter === "neutral" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSentimentFilter("neutral")}
            className="h-8 text-xs"
          >
            Mixed
          </Button>
          <Button
            variant={sentimentFilter === "negative" ? "default" : "ghost"}
            size="sm"
            onClick={() => onSentimentFilter("negative")}
            className="h-8 text-xs"
          >
            <TrendingDown className="w-3 h-3 mr-1 text-destructive" />
            Bad
          </Button>
        </div>
      </div>
    </div>
  );
};
