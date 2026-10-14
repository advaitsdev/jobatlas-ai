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

import AddApplicationDialog from "@/components/applications/AddApplicationDialog";

import EditOpportunityDialog from "./EditOpportunityDialog";
import DeleteOpportunityDialog from "./DeleteOpportunityDialog";
import OpportunitySkillMatch from "./OpportunitySkillMatch";
import OpportunityApplicationDialog from "./OpportunityApplicationDialog";

type Props = {
  opportunity: Opportunity;
};

export default function OpportunityActions({
  opportunity,
}: Props) {
  const [skillMatchOpen, setSkillMatchOpen] =
    useState(false);

  const hasApplication = Boolean(
    opportunity.application_id
  );

  return (
    <div className="flex justify-center gap-2">
      <EditOpportunityDialog
        opportunity={opportunity}
      />

      <DeleteOpportunityDialog
        opportunity={opportunity}
      />

      {hasApplication ? (
        <OpportunityApplicationDialog
          applicationId={
            opportunity.application_id!
          }
        />
      ) : (
        <AddApplicationDialog
          title="Apply to Opportunity"
          initialValues={{
            company:
              opportunity.company.name,
            role: opportunity.title,
            location:
              opportunity.location ?? "",
            source:
              opportunity.source ?? "LinkedIn",
            job_url:
              opportunity.application_url,
            status: "Applied",
            salary:
              opportunity.salary ?? "",
            date_applied:
              new Date()
                .toISOString()
                .split("T")[0],
            notes:
              opportunity.notes ?? "",
            opportunity_id:
              opportunity.id,
          }}
          trigger={
            <Button
              variant="default"
              size="sm"
            >
              Apply
            </Button>
          }
        />
      )}

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