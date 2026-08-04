import { useState } from "react";
import type { OpportunityFormData } from "@/types/opportunity";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import OpportunityForm from "./OpportunityForm";

import { createOpportunity } from "@/services/opportunity";

export default function AddOpportunityDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<OpportunityFormData>({
    title: "",
    company_id: "",
    

    location: "",
    employment_type: "",

    application_url: "",
    salary: "",

    applied_date: "",

    deadline: "",

    notes: "",
  });

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
        title: "",
        company_id: "",
        

        location: "",
        employment_type: "",

        application_url: "",
        salary: "",

        applied_date: "",

        deadline: "",

        notes: "",
      });
    },

    onError: () => {
      toast.error("Failed to add opportunity.");
    },
  });

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

      <DialogContent className="max-w-2xl">
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
            onClick={() => {
                mutation.mutate({
                ...form,
                applied_date: form.applied_date || undefined,
                deadline: form.deadline || undefined,
                });
            }}
            >
                Save
                </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}