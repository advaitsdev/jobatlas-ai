import { useEffect, useState, type ReactElement } from "react";
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

type Props = {
  initialValues?: Partial<CreateApplicationRequest>;
  trigger?: ReactElement;
  title?: string;
};

const getInitialForm = (
  initialValues?: Partial<CreateApplicationRequest>
): CreateApplicationRequest => ({
  company: initialValues?.company ?? "",
  role: initialValues?.role ?? "",
  location: initialValues?.location ?? "",
  source: initialValues?.source ?? "LinkedIn",
  job_url: initialValues?.job_url ?? null,
  status: initialValues?.status ?? "Applied",
  salary: initialValues?.salary ?? "",
  date_applied:
    initialValues?.date_applied ??
    new Date().toISOString().split("T")[0],
  notes: initialValues?.notes ?? "",
  opportunity_id: initialValues?.opportunity_id ?? null,
});

export default function AddApplicationDialog({
  initialValues,
  trigger,
  title = "Add Application",
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] =
    useState<CreateApplicationRequest>(
      getInitialForm(initialValues)
    );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      setForm(getInitialForm(initialValues));
    }
  }, [open, initialValues]);

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

      setForm(getInitialForm(initialValues));
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
          trigger ?? (
            <Button>
              + Add Application
            </Button>
          )
        }
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
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