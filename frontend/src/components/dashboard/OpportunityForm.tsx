
import { useCompanies } from "@/hooks/useCompanies";
import { useState } from "react";
import type { Opportunity } from "@/types/opportunity";

type OpportunityFormProps = {
  onSubmit: (data: {
    title: string;
    company_id: string;
    location: string;
    employment_type: string;
    salary: string;
    deadline: string;
    notes: string;
  }) => void;

  initialValues?: Opportunity;
};
export default function OpportunityForm({
  onSubmit,
  initialValues,
}: OpportunityFormProps) {
    const { companies } = useCompanies();
 const [companyId, setCompanyId] = useState(
  initialValues?.company.id ?? ""
);

const [title, setTitle] = useState(
  initialValues?.title ?? ""
);

const [location, setLocation] = useState(
  initialValues?.location ?? ""
);

const [salary, setSalary] = useState(
  initialValues?.salary ?? ""
);

const [employmentType, setEmploymentType] = useState(
  initialValues?.employment_type ?? "Full Time"
);

const [deadline, setDeadline] = useState(
  initialValues?.deadline ?? ""
);

const [notes, setNotes] = useState(
  initialValues?.notes ?? ""
);

  return (
  <form
    className="mt-6 space-y-4"
    onSubmit={(e) => {
      e.preventDefault();

      onSubmit({
        title,
        company_id: companyId,
        location,
        employment_type: employmentType,
        salary,
        deadline,
        notes,
      });
    }}
  >
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        type="text"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />
      <select
    value={companyId}
    onChange={(e) => setCompanyId(e.target.value)}
    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
    >
    <option value="">Select Company</option>

    {companies.map((company) => (
    <option key={company.id} value={company.id}>
      {company.name}
    </option>
    ))}
    </select>
      <select
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option>Full Time</option>
        <option>Internship</option>
        <option>Part Time</option>
        <option>Contract</option>
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />
      <div className="flex justify-end">
  <button
    type="submit"
    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
  >
    {initialValues ? "Save Changes" : "Create Opportunity"}
  </button>
</div>
    </form>
  );
}