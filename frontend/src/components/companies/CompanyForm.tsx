import { Input } from "@/components/ui/input";

type Props = {
  form: {
    name: string;
    website: string;
    industry: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      website: string;
      industry: string;
    }>
  >;
};

export default function CompanyForm({
  form,
  setForm,
}: Props) {
  return (
    <div className="grid gap-4 py-4">
      <Input
        placeholder="Company Name"
        value={form.name}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />

      <Input
        placeholder="Website"
        value={form.website}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            website: e.target.value,
          }))
        }
      />

      <Input
        placeholder="Industry"
        value={form.industry}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            industry: e.target.value,
          }))
        }
      />
    </div>
  );
}