import { useState } from "react";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import CompanyForm from "./CompanyForm";

import { updateCompany } from "@/services/company";

import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function EditCompanyDialog({
  company,
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: company.name,
    website: company.website ?? "",
    industry: company.industry ?? "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: typeof form) =>
      updateCompany(company.id, data),

    onSuccess: () => {
      toast.success("Company updated!");

      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to update company.");
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setForm({
            name: company.name,
            website: company.website ?? "",
            industry: company.industry ?? "",
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
            Edit Company
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
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}