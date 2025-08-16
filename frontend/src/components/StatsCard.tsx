import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = "neutral",
  subtitle 
}: StatsCardProps) => {
  const changeColorClass = {
    positive: "text-success",
    negative: "text-destructive", 
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="gradient-card border-border/50 shadow-medical hover:shadow-primary transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
            {change && (
              <p className={`text-sm font-medium ${changeColorClass}`}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-gradient-primary rounded-lg">
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};