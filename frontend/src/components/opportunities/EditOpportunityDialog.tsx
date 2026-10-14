import { useState } from "react";

import { Pencil } from "lucide-react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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

  const createFormFromOpportunity =
    (): OpportunityFormData => ({
      title: opportunity.title,

      company_id:
        opportunity.company.id,

      location:
        opportunity.location ?? "",

      employment_type:
        opportunity.employment_type ?? "",
      source:
        opportunity.source ?? "",

      application_url:
        opportunity.application_url ?? "",

      salary:
        opportunity.salary ?? "",

      applied_date:
        opportunity.applied_date ??
        undefined,

      deadline:
        opportunity.deadline ??
        undefined,

      notes:
        opportunity.notes ?? "",

      // Job Description
      job_description:
        opportunity.job_description ?? "",

      required_skills:
        opportunity.required_skills ?? [],

      preferred_skills:
        opportunity.preferred_skills ?? [],

      responsibilities:
        opportunity.responsibilities ?? [],

      qualifications:
        opportunity.qualifications ?? [],

      experience_required:
        opportunity.experience_required ??
        "",

      education_required:
        opportunity.education_required ??
        "",
    });

  const [form, setForm] =
    useState<OpportunityFormData>(
      createFormFromOpportunity()
    );

  const queryClient =
    useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      data: OpportunityFormData
    ) =>
      updateOpportunity(
        opportunity.id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Opportunity updated!"
      );

      queryClient.invalidateQueries({
        queryKey: ["opportunities"],
      });

      setOpen(false);
    },

    onError: () => {
      toast.error(
        "Failed to update opportunity."
      );
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setForm(
            createFormFromOpportunity()
          );
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

      <DialogContent
        className="
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
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
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={() =>
              mutation.mutate({
                ...form,
                applied_date:
                  form.applied_date ||
                  undefined,
                deadline:
                  form.deadline ||
                  undefined,
              })
            }
            disabled={
              mutation.isPending
            }
          >
            {mutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}