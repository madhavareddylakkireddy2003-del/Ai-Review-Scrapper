import { Zap, Brain, BarChart3, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Sentiment",
    description: "Real-time sentiment analysis using NLP to classify reviews",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Interactive charts for rating distribution and trends",
    color: "accent",
  },
  {
    icon: Globe,
    title: "Multi-Source Scraping",
    description: "Unified scraping from G2, Capterra, and Trustpilot",
    color: "capterra",
  },
  {
    icon: Sparkles,
    title: "Keyword Extraction",
    description: "Dynamic word cloud from review content analysis",
    color: "trustpilot",
  },
];

export const InnovativeFeatures = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Innovative Features</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{
                backgroundColor: `hsl(var(--${feature.color}) / 0.15)`,
                color: `hsl(var(--${feature.color}))`,
              }}
            >
              <feature.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
