import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
}: DashboardCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">{value}</h2>
        </div>

        <div className={`rounded-full bg-muted p-4 ${iconColor}`}>
          <Icon size={30} />
        </div>
      </CardContent>
    </Card>
  );
}