import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { createApplication } from "@/services/application";
import type { CreateApplicationRequest } from "@/types/application";

import ApplicationForm from "./ApplicationForm";

const initialForm: CreateApplicationRequest = {
  company: "",
  role: "",
  location: "",
  source: "LinkedIn",
  status: "Applied",
  salary: "",
  date_applied: new Date().toISOString().split("T")[0],
  notes: "",
};

export default function AddApplicationDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] =
    useState<CreateApplicationRequest>(initialForm);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createApplication,

    onSuccess: () => {
      toast.success("Application added!");

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      setForm(initialForm);
      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to add application.");
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
            + Add Application
          </Button>
        }
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Add Application
          </DialogTitle>
        </DialogHeader>

        <ApplicationForm
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
            onClick={() => mutation.mutate(form)}
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