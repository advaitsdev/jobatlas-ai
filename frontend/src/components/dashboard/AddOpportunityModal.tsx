import { createOpportunity } from "@/services/opportunity";
import OpportunityForm from "./OpportunityForm";

import type { Opportunity } from "@/types/opportunity";

type AddOpportunityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (opportunity: Opportunity) => void;
};

export default function AddOpportunityModal({
  isOpen,
  onClose,
  onCreated,
}: AddOpportunityModalProps) {
  if (!isOpen) return null;
  const handleCreate = async (data: {
  title: string;
  company_id: string;
  location: string;
  employment_type: string;
  salary: string;
  deadline: string;
  notes: string;
}) => {
  try {
    const createdOpportunity = await createOpportunity({
  ...data,
  user_id: "YOUR-USER-ID",
});

onCreated(createdOpportunity);

onClose();
  } catch (error) {
    console.error(error);
    alert("Failed to create opportunity.");
  }
};
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-xl bg-slate-800 p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white">
          Add Opportunity
        </h2>

        <p className="mt-2 text-slate-400">
          Fill in the opportunity details.
        </p>

   <OpportunityForm onSubmit={handleCreate} />

        <div className="mt-6 flex justify-end gap-3">
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