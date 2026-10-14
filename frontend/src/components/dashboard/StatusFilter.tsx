const statuses = [
  "All",
  "wishlist",
  "applied",
  "interview",
  "offer",
  "rejected",
];

type StatusFilterProps = {
  value: string;
  onChange: (status: string) => void;
};

export default function StatusFilter({
  value,
  onChange,
}: StatusFilterProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`rounded-lg px-4 py-2 transition-colors ${
            value === status
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}