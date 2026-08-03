import { Input } from "@/components/ui/input";

type Props = {
  form: {
    company: string;
    role: string;
    location: string;
    source: string;
    status: string;
    salary: string;
    date_applied: string;
    notes: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<{
      company: string;
      role: string;
      location: string;
      source: string;
      status: string;
      salary: string;
      date_applied: string;
      notes: string;
    }>
  >;
};

export default function ApplicationForm({
  form,
  setForm,
}: Props) {
  const updateField = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">

      <Input
        placeholder="Company"
        value={form.company}
        onChange={(e) =>
          updateField("company", e.target.value)
        }
      />

      <Input
        placeholder="Role"
        value={form.role}
        onChange={(e) =>
          updateField("role", e.target.value)
        }
      />

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          updateField("location", e.target.value)
        }
      />

      <select
        value={form.source}
        onChange={(e) =>
          updateField("source", e.target.value)
        }
        className="w-full rounded-md border p-2"
      >
        <option value="LinkedIn">LinkedIn</option>
        <option value="Indeed">Indeed</option>
        <option value="Naukri">Naukri</option>
        <option value="Foundit">Foundit</option>
        <option value="Referral">Referral</option>
        <option value="Campus">Campus</option>
        <option value="Company Career Page">
          Company Career Page
        </option>
        <option value="Other">Other</option>
      </select>

      <select
        value={form.status}
        onChange={(e) =>
          updateField("status", e.target.value)
        }
        className="w-full rounded-md border p-2"
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="HR">HR</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
        <option value="Ghosted">Ghosted</option>
        <option value="Withdrawn">Withdrawn</option>
      </select>

      <Input
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          updateField("salary", e.target.value)
        }
      />

      <Input
        type="date"
        value={form.date_applied}
        onChange={(e) =>
          updateField("date_applied", e.target.value)
        }
      />

      <textarea
        className="min-h-24 w-full rounded-md border p-2"
        placeholder="Notes..."
        value={form.notes}
        onChange={(e) =>
          updateField("notes", e.target.value)
        }
      />
    </div>
  );
}