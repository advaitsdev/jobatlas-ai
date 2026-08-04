import { useState } from "react";

import { Pencil } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import OpportunityForm from "./OpportunityForm";

import { updateOpportunity } from "@/services/opportunity";

import type {
  Opportunity,
  OpportunityFormData,
} from "@/types/opportunity";

type Props = {
  opportunity: Opportunity;
};

export default function EditOpportunityDialog({
  opportunity,
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<OpportunityFormData>({
    title: opportunity.title,
    company_id: opportunity.company.id,

    location: opportunity.location ?? "",
    employment_type: opportunity.employment_type ?? "",

    application_url: opportunity.application_url ?? "",
    salary: opportunity.salary ?? "",

    applied_date: opportunity.applied_date ?? undefined,
    deadline: opportunity.deadline ?? undefined,

    notes: opportunity.notes ?? "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: OpportunityFormData) =>
      updateOpportunity(opportunity.id, data),

    onSuccess: () => {
      toast.success("Opportunity updated!");

      queryClient.invalidateQueries({
        queryKey: ["opportunities"],
      });

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to update opportunity.");
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setForm({
            title: opportunity.title,
            company_id: opportunity.company.id,

            location: opportunity.location ?? "",
            employment_type:
              opportunity.employment_type ?? "",

            application_url:
              opportunity.application_url ?? "",

            salary: opportunity.salary ?? "",

            applied_date:
              opportunity.applied_date ?? undefined,

            deadline:
              opportunity.deadline ?? undefined,

            notes: opportunity.notes ?? "",
          });
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Edit Opportunity
          </DialogTitle>
        </DialogHeader>

        <OpportunityForm
          form={form}
          setForm={setForm}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={() =>
              mutation.mutate({
                ...form,
                applied_date:
                  form.applied_date || undefined,
                deadline:
                  form.deadline || undefined,
              })
            }
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}