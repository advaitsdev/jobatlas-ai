import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import OpportunityForm from "./OpportunityForm";

import { createOpportunity } from "@/services/opportunity";

import type { OpportunityFormData } from "@/types/opportunity";


const initialForm: OpportunityFormData = {
  title: "",
  company_id: "",

  location: "",
  employment_type: "",
  source: "",

  application_url: "",
  salary: "",

  applied_date: "",
  deadline: "",

  notes: "",

  // Job Description
  job_description: "",
  required_skills: [],
  preferred_skills: [],
  responsibilities: [],
  qualifications: [],
  experience_required: "",
  education_required: "",
};


export default function AddOpportunityDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] =
    useState<OpportunityFormData>(
      initialForm
    );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOpportunity,

    onSuccess: () => {
      toast.success("Opportunity added!");

      queryClient.invalidateQueries({
        queryKey: ["opportunities"],
      });

      setOpen(false);

      setForm({
        ...initialForm,
      });
    },

    onError: () => {
      toast.error(
        "Failed to add opportunity."
      );
    },
  });

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error(
        "Please enter a job title."
      );
      return;
    }

    if (!form.company_id) {
      toast.error(
        "Please select a company."
      );
      return;
    }

    mutation.mutate({
      title: form.title,
      company_id: form.company_id,

      location:
        form.location || undefined,

      employment_type:
        form.employment_type || undefined,

      source:
        form.source || undefined,

      application_url:
        form.application_url || undefined,

      salary:
        form.salary || undefined,

      applied_date:
        form.applied_date || undefined,

      deadline:
        form.deadline || undefined,

      notes:
        form.notes || undefined,

      // Job Description
      job_description:
        form.job_description || undefined,

      required_skills:
        form.required_skills.length > 0
          ? form.required_skills
          : undefined,

      preferred_skills:
        form.preferred_skills.length > 0
          ? form.preferred_skills
          : undefined,

      responsibilities:
        form.responsibilities.length > 0
          ? form.responsibilities
          : undefined,

      qualifications:
        form.qualifications.length > 0
          ? form.qualifications
          : undefined,

      experience_required:
        form.experience_required || undefined,

      education_required:
        form.education_required || undefined,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button>
            + Add Opportunity
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
            Add Opportunity
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
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Saving..."
              : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}