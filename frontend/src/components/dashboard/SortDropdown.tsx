type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

const options = [
  "Newest",
  "Oldest",
  "Company A-Z",
  "Deadline",
];

export default function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="mt-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}