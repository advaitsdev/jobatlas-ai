import { useState } from "react";

import type { Opportunity } from "@/types/opportunity";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import EditOpportunityDialog from "./EditOpportunityDialog";
import DeleteOpportunityDialog from "./DeleteOpportunityDialog";
import OpportunitySkillMatch from "./OpportunitySkillMatch";

type Props = {
  opportunity: Opportunity;
};

export default function OpportunityActions({
  opportunity,
}: Props) {
  const [skillMatchOpen, setSkillMatchOpen] =
    useState(false);

  return (
    <div className="flex justify-center gap-2">
      <EditOpportunityDialog
        opportunity={opportunity}
      />

      <DeleteOpportunityDialog
        opportunity={opportunity}
      />

      <Dialog
        open={skillMatchOpen}
        onOpenChange={setSkillMatchOpen}
      >
        <DialogTrigger
          render={
            <Button
              variant="outline"
              size="sm"
            >
              Match
            </Button>
          }
        />

        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Resume Skill Match
            </DialogTitle>
          </DialogHeader>

          {skillMatchOpen && (
            <OpportunitySkillMatch
              opportunityId={opportunity.id}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}