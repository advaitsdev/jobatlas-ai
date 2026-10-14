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

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import CompanyForm from "./CompanyForm";

import { createCompany } from "@/services/company";

export default function AddCompanyDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    website: "",
    industry: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCompany,

    onSuccess: () => {
      toast.success("Company added!");

      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

      setOpen(false);

      setForm({
        name: "",
        website: "",
        industry: "",
      });
    },

    onError: () => {
      toast.error("Failed to add company.");
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={<Button>+ Add Company</Button>}
      />

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Add Company
          </DialogTitle>
        </DialogHeader>

        <CompanyForm
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
              mutation.mutate(form)
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}