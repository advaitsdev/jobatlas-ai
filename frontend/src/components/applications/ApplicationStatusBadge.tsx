import { Badge } from "@/components/ui/badge";

type Props = {
  status: string;
};

const statusStyles: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Interview: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  HR: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  Offer: "bg-green-100 text-green-700 hover:bg-green-100",
  Rejected: "bg-red-100 text-red-700 hover:bg-red-100",
  Ghosted: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  Withdrawn: "bg-slate-100 text-slate-700 hover:bg-slate-100",
};

export default function ApplicationStatusBadge({
  status,
}: Props) {
  return (
    <Badge
      className={
        statusStyles[status] ??
        "bg-secondary text-secondary-foreground"
      }
    >
      {status}
    </Badge>
  );
}