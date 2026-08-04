import type { Opportunity } from "@/types/opportunity";

import EditOpportunityDialog from "./EditOpportunityDialog";
import DeleteOpportunityDialog from "./DeleteOpportunityDialog";

type Props = {
  opportunity: Opportunity;
};

export default function OpportunityActions({
  opportunity,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      <EditOpportunityDialog
        opportunity={opportunity}
      />

      <DeleteOpportunityDialog
        opportunity={opportunity}
      />
    </div>
  );
}