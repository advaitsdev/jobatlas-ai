import { Input } from "@/components/ui/input";
import OpportunitySelect from "./OpportunitySelect";
import type { OpportunityFormData } from "@/types/opportunity";


type Props = {
  form: OpportunityFormData;
  setForm: React.Dispatch<
    React.SetStateAction<OpportunityFormData>
  >;
};

export default function OpportunityForm({
  form,
  setForm,
}: Props) {
  return (
    <div className="grid gap-4 py-4">

      <Input
        placeholder="Job Title"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />

      <OpportunitySelect
        value={form.company_id}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            company_id: value,
          }))
        }
      />

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            location: e.target.value,
          }))
        }
      />

      <select
        className="rounded-md border px-3 py-2"
        value={form.employment_type}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            employment_type: e.target.value,
          }))
        }
      >
        <option value="">
          Employment Type
        </option>

        <option value="Internship">
          Internship
        </option>

        <option value="Full-Time">
          Full-Time
        </option>

        <option value="Part-Time">
          Part-Time
        </option>

        <option value="Contract">
          Contract
        </option>

        <option value="Freelance">
          Freelance
        </option>

        <option value="Remote">
          Remote
        </option>
      </select>

      <Input
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            salary: e.target.value,
          }))
        }
      />

      <Input
        placeholder="Application URL"
        value={form.application_url}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            application_url: e.target.value,
          }))
        }
      />

            <Input
        type="date"
        value={form.deadline ?? ""}
        onChange={(e) =>
            setForm((prev) => ({
            ...prev,
            deadline: e.target.value,
            }))
        }
        />

      <textarea
        className="min-h-24 rounded-md border p-3"
        placeholder="Notes"
        value={form.notes}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            notes: e.target.value,
          }))
        }
      />
    </div>
  );
}