import { Badge } from "@/components/ui/badge";

import type { OpportunityStatus } from "@/types/opportunity";

type Props = {
  status: OpportunityStatus;
};

const variants: Record<
  OpportunityStatus,
  "secondary" | "default" | "destructive"
> = {
  WISHLIST: "secondary",
  APPLIED: "default",
  INTERVIEW: "default",
  OFFER: "default",
  REJECTED: "destructive",
};

export default function OpportunityStatusBadge({
  status,
}: Props) {
  return (
    <Badge variant={variants[status]}>
      {status.replace("_", " ")}
    </Badge>
  );
}