type Props = {
  value: string;

  onChange: (
    value: string
  ) => void;
};

export default function JobDescriptionInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900 p-6">

      <h2 className="mb-4 text-xl font-semibold text-white">
        Job Description
      </h2>

      <textarea
        rows={12}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Paste the job description here..."
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-blue-500"
      />

    </div>
  );
}