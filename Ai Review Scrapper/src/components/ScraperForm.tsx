import { useState } from "react";
import { Search, Calendar, Building2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SourceCard } from "./SourceCard";
import { toast } from "sonner";

type Source = "g2" | "capterra" | "trustpilot";

interface ScraperFormProps {
  onScrape: (companyName: string, startDate: string, endDate: string, source: Source) => void;
  isLoading: boolean;
}

export const ScraperForm = ({ onScrape, isLoading }: ScraperFormProps) => {
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date must be before end date");
      return;
    }

    if (!selectedSource) {
      toast.error("Please select a review source");
      return;
    }

    onScrape(companyName, startDate, endDate, selectedSource);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company Name */}
      <div className="space-y-3">
        <Label htmlFor="company" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Company Name
        </Label>
        <div className="relative">
          <Input
            id="company"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Slack, Notion, Figma"
            className="h-12 pl-4 pr-4 bg-secondary border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="startDate" className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-12 bg-secondary border-border focus:border-primary text-foreground"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="endDate" className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-12 bg-secondary border-border focus:border-primary text-foreground"
          />
        </div>
      </div>

      {/* Source Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Select Review Source</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SourceCard
            name="G2"
            icon={
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm5 8h-2v-4h-2v-2h4v6z" />
              </svg>
            }
            description="Business software reviews"
            selected={selectedSource === "g2"}
            onClick={() => setSelectedSource("g2")}
            colorClass="g2"
          />
          <SourceCard
            name="Capterra"
            icon={
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v2h-4V7zm0 4h4v2h-4v-2zm-6 4h10v2H7v-2z" />
              </svg>
            }
            description="Software discovery platform"
            selected={selectedSource === "capterra"}
            onClick={() => setSelectedSource("capterra")}
            colorClass="capterra"
          />
          <SourceCard
            name="Trustpilot"
            icon={
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            }
            description="Consumer reviews (Bonus)"
            selected={selectedSource === "trustpilot"}
            onClick={() => setSelectedSource("trustpilot")}
            colorClass="trustpilot"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="glow"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Scraping Reviews...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Scrape Reviews
          </>
        )}
      </Button>
    </form>
  );
};
