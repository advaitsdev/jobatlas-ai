import { toast } from "sonner";
import { updateOpportunity } from "@/services/opportunity";
import type { Opportunity } from "@/types/opportunity";
import OpportunityForm from "./OpportunityForm";

type EditOpportunityModalProps = {
  isOpen: boolean;
  opportunity: Opportunity | null;
  onClose: () => void;
  onUpdated: (updatedOpportunity: Opportunity) => void;
};

export default function EditOpportunityModal({
  isOpen,
  opportunity,
  onClose,
  onUpdated,
}: EditOpportunityModalProps) {
  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-xl bg-slate-800 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white">
          Edit Opportunity
        </h2>

        <p className="mt-2 text-slate-400">
          Update this opportunity.
        </p>

        <OpportunityForm
          initialValues={opportunity}
          onSubmit={async (data) => {
  try {
    const updatedOpportunity = await updateOpportunity(opportunity.id, data);

onUpdated(updatedOpportunity);

toast.success("Opportunity updated successfully!");

onClose();
  } catch (error) {
    console.error(error);
    alert("Failed to update opportunity.");
  }
}}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}