import { useState, useMemo } from "react";
import { ScraperForm } from "@/components/ScraperForm";
import { ReviewCard } from "@/components/ReviewCard";
import { JsonPreview } from "@/components/JsonPreview";
import { SentimentGauge } from "@/components/SentimentGauge";
import { WordCloud } from "@/components/WordCloud";
import { RatingChart } from "@/components/RatingChart";
import { TimelineChart } from "@/components/TimelineChart";
import { InnovativeFeatures } from "@/components/InnovativeFeatures";
import { SmartFilters } from "@/components/SmartFilters";
import { ExportOptions } from "@/components/ExportOptions";
import { generateMockReviews } from "@/lib/mockData";
import { FileJson, LayoutGrid, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ViewMode = "cards" | "json" | "analytics";

interface Review {
  title: string;
  description: string;
  date: string;
  reviewer: string;
  rating: number;
  source: string;
}

const Index = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [hasSearched, setHasSearched] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "neutral" | "negative">("all");

  // Calculate sentiment from rating
  const getSentiment = (rating: number) => {
    if (rating >= 4) return "positive";
    if (rating === 3) return "neutral";
    return "negative";
  };

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch = searchQuery === "" || 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRating = ratingFilter === null || review.rating === ratingFilter;
      
      const sentiment = getSentiment(review.rating);
      const matchesSentiment = sentimentFilter === "all" || sentiment === sentimentFilter;

      return matchesSearch && matchesRating && matchesSentiment;
    });
  }, [reviews, searchQuery, ratingFilter, sentimentFilter]);

  // Sentiment counts
  const sentimentCounts = useMemo(() => {
    const counts = { positive: 0, neutral: 0, negative: 0 };
    reviews.forEach((r) => {
      const sentiment = getSentiment(r.rating);
      counts[sentiment]++;
    });
    return counts;
  }, [reviews]);

  const handleScrape = async (
    companyName: string,
    startDate: string,
    endDate: string,
    source: "g2" | "capterra" | "trustpilot"
  ) => {
    setIsLoading(true);
    setHasSearched(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockReviews = generateMockReviews(companyName, startDate, endDate, source);
    setReviews(mockReviews);
    setIsLoading(false);
    setSearchQuery("");
    setRatingFilter(null);
    setSentimentFilter("all");

    toast.success(`Found ${mockReviews.length} reviews for ${companyName}`);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(filteredReviews, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reviews.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground font-sans">Pulse Review Scraper</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="text-primary">Scrape Reviews</span>
            <br />
            <span className="text-foreground">from Top Platforms</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in font-sans" style={{ animationDelay: "200ms" }}>
            Extract product reviews from G2, Capterra, and Trustpilot with AI-powered sentiment analysis.
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form & Features */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="glass-card rounded-lg p-6">
              <h2 className="text-xl text-foreground mb-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-primary/15 flex items-center justify-center">
                  <FileJson className="w-4 h-4 text-primary" />
                </div>
                <span className="font-sans font-semibold">Configure Scraper</span>
              </h2>
              <ScraperForm onScrape={handleScrape} isLoading={isLoading} />
            </div>

            <InnovativeFeatures />
          </div>

          {/* Middle Column - Results */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {/* View Controls */}
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-accent/15 flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-sans font-semibold">Results</span>
                  {reviews.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({filteredReviews.length} of {reviews.length} reviews)
                    </span>
                  )}
                </h2>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
                    <Button
                      variant={viewMode === "cards" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("cards")}
                      className={viewMode === "cards" ? "bg-muted" : ""}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "analytics" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("analytics")}
                      className={viewMode === "analytics" ? "bg-muted" : ""}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "json" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("json")}
                      className={viewMode === "json" ? "bg-muted" : ""}
                    >
                      <FileJson className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {!hasSearched ? (
              <div className="glass-card rounded-lg p-8">
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <FileJson className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg text-foreground mb-2">No reviews yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs font-sans">
                    Configure the scraper parameters and click "Scrape Reviews" to get started
                  </p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="glass-card rounded-lg p-8">
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-12 h-12 rounded-full border-3 border-secondary border-t-primary animate-spin" />
                  <p className="mt-5 text-muted-foreground font-sans">Analyzing reviews...</p>
                </div>
              </div>
            ) : viewMode === "analytics" ? (
              <div className="space-y-4">
                {/* Analytics Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <SentimentGauge
                    positive={sentimentCounts.positive}
                    neutral={sentimentCounts.neutral}
                    negative={sentimentCounts.negative}
                  />
                  <RatingChart reviews={reviews} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <TimelineChart reviews={reviews} />
                  <WordCloud reviews={reviews} />
                </div>
                <ExportOptions reviews={filteredReviews} />
              </div>
            ) : viewMode === "json" ? (
              <JsonPreview data={filteredReviews} onDownload={handleDownload} />
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {/* Filters Sidebar */}
                <div className="md:col-span-1 space-y-4">
                  <SmartFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    ratingFilter={ratingFilter}
                    onRatingFilter={setRatingFilter}
                    sentimentFilter={sentimentFilter}
                    onSentimentFilter={setSentimentFilter}
                  />
                  <ExportOptions reviews={filteredReviews} />
                </div>
                
                {/* Reviews List */}
                <div className="md:col-span-2 space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review, index) => (
                      <ReviewCard key={index} review={review} index={index} />
                    ))
                  ) : (
                    <div className="glass-card rounded-lg p-8 text-center">
                      <p className="text-muted-foreground font-sans">No reviews match your filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <p className="text-sm text-muted-foreground font-sans">
            Built for Pulse Coding Assignment — G2 · Capterra · Trustpilot
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
