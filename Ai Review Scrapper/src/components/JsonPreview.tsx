import { Copy, Download, Check } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface JsonPreviewProps {
  data: any;
  onDownload: () => void;
}

export const JsonPreview = ({ data, onDownload }: JsonPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      toast.success("JSON copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const jsonString = JSON.stringify(data, null, 2);
  const lines = jsonString.split("\n");

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <span className="text-sm font-mono text-muted-foreground">reviews.json</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onDownload}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-auto">
        <pre className="p-4 text-sm font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="text-muted-foreground/50 select-none w-10 text-right pr-4">
                  {i + 1}
                </span>
                <span className="text-foreground">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
