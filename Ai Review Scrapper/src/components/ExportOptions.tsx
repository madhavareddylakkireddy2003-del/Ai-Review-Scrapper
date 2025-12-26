import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Review {
  title: string;
  description: string;
  date: string;
  reviewer: string;
  rating: number;
  source: string;
}

interface ExportOptionsProps {
  reviews: Review[];
}

export const ExportOptions = ({ reviews }: ExportOptionsProps) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(reviews, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reviews.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded");
  };

  const exportCSV = () => {
    const headers = ["Title", "Description", "Date", "Reviewer", "Rating", "Source"];
    const rows = reviews.map((r) => [
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.description.replace(/"/g, '""')}"`,
      r.date,
      r.reviewer,
      r.rating,
      r.source,
    ]);
    
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reviews.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV file downloaded");
  };

  const exportMarkdown = () => {
    const md = reviews
      .map(
        (r) => `## ${r.title}

**Reviewer:** ${r.reviewer} | **Date:** ${r.date} | **Rating:** ${"⭐".repeat(r.rating)} | **Source:** ${r.source}

${r.description}

---
`
      )
      .join("\n");

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reviews.md";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown file downloaded");
  };

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Download className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-foreground text-sm">Export Options</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" onClick={exportJSON} className="h-12 flex-col gap-1">
          <FileJson className="w-4 h-4 text-primary" />
          <span className="text-xs">JSON</span>
        </Button>
        <Button variant="outline" size="sm" onClick={exportCSV} className="h-12 flex-col gap-1">
          <FileSpreadsheet className="w-4 h-4 text-success" />
          <span className="text-xs">CSV</span>
        </Button>
        <Button variant="outline" size="sm" onClick={exportMarkdown} className="h-12 flex-col gap-1">
          <FileText className="w-4 h-4 text-accent" />
          <span className="text-xs">Markdown</span>
        </Button>
      </div>
    </div>
  );
};
