import { BriefcaseBusiness } from "lucide-react";

export default function OpportunityEmptyState() {
  return (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <BriefcaseBusiness className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

      <h2 className="text-xl font-semibold">
        No opportunities found
      </h2>

      <p className="mt-2 text-muted-foreground">
        Try changing your filters or add your first opportunity.
      </p>
    </div>
  );
}