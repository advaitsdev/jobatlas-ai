import { useState } from "react";

import { Trash2 } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteOpportunity } from "@/services/opportunity";
import type { Opportunity } from "@/types/opportunity";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  opportunity: Opportunity;
};

export default function DeleteOpportunityDialog({
  opportunity,
}: Props) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error>({
    mutationFn: () => deleteOpportunity(opportunity.id),

    onSuccess: async () => {
      toast.success("Opportunity deleted!");

      await queryClient.invalidateQueries({
        queryKey: ["opportunities"],
      });

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to delete opportunity.");
    },
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Opportunity?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{opportunity.title}</strong>?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            >
            {mutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}