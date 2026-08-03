import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil } from "lucide-react";



import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type {
  JobApplication,
  CreateApplicationRequest,
} from "@/types/application";

import { updateApplication } from "@/services/application";

import ApplicationForm from "./ApplicationForm";

type Props = {
  application: JobApplication;
};

export default function EditApplicationDialog({
  application,
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] =
    useState<CreateApplicationRequest>({
      company: "",
      role: "",
      location: "",
      source: "LinkedIn",
      status: "Applied",
      salary: "",
      date_applied: "",
      notes: "",
    });

  useEffect(() => {
    setForm({
      company: application.company,
      role: application.role,
      location: application.location ?? "",
      source: application.source,
      status: application.status,
      salary: application.salary ?? "",
      date_applied: application.date_applied,
      notes: application.notes ?? "",
    });
  }, [application]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateApplicationRequest) =>
      updateApplication(application.id, payload),

    onSuccess: () => {
      toast.success("Application updated!");

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to update application.");
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            size="sm"
            variant="outline"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Application
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
              : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}