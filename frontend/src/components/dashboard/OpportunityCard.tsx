import { toast } from "sonner";
import { deleteOpportunity } from "@/services/opportunity";
type OpportunityCardProps = {
  id: string;
  title: string;
  status: string;
  location: string;
  company: {
    id: string;
    name: string;
  };
  salary?: string;
  employmentType?: string;
  deadline?: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function OpportunityCard({
  id,
  title,
  status,
  location,
  company,
  salary,
  employmentType,
  deadline,
  onDelete,
  onEdit
}: OpportunityCardProps) {
  const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "wishlist":
      return "bg-blue-600";

    case "applied":
      return "bg-yellow-500";

    case "interview":
      return "bg-purple-600";

    case "offer":
      return "bg-green-600";

    case "rejected":
      return "bg-red-600";

    default:
      return "bg-slate-600";
  }
};
  const formatDate = (date?: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
  const handleDelete = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this opportunity?"
  );

  if (!confirmed) return;

  try {
    await deleteOpportunity(id);

onDelete(id);

toast.success("Opportunity deleted successfully!");
  } catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  toast.error("Failed to create opportunity.");
}
};
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <h2 className="text-xl font-semibold text-white">
  {title}
</h2>

     <p className="mt-2 text-sm text-slate-300">
        Company
    </p>

    <p className="mt-2 text-slate-300">
  🏢 <span className="font-semibold text-white">{company.name}</span>
    </p>

      <p className="text-slate-400">
        📍 {location}
      </p>
      {salary && (
      <p className="text-slate-400">
        💰 {salary}
      </p>
    )}

    {employmentType && (
      <p className="text-slate-400">
        🕒 {employmentType}
      </p>
    )}

    {deadline && (
      <p className="text-slate-400">
        📅 {formatDate(deadline)}
      </p>
    )}


      <span
        className={`mt-3 inline-block rounded px-3 py-1 text-sm font-medium text-white ${getStatusClass(status)}`}
>
        {status}
    </span>
      <div className="mt-4 flex justify-end gap-3">
        <button
            onClick={() => onEdit(id)}
    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    ✏ Edit
  </button>
  <button
    onClick={handleDelete}
    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
  >
    🗑 Delete
  </button>
</div>
    </div>
  );

  
}