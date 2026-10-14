import type { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import EditCompanyDialog from "./EditCompanyDialog";
import DeleteCompanyDialog from "./DeleteCompanyDialog";


type Props = {
  companies: Company[];
};

export default function CompanyTable({
  companies,
}: Props) {
  return (
    <div className="rounded-xl border">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-4 text-left">Company</th>
            <th className="px-6 py-4 text-left">Industry</th>
            <th className="px-6 py-4 text-left">Website</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className="border-b"
            >
              <td className="px-6 py-4 font-medium">
                {company.name}
              </td>

              <td className="px-6 py-4">
                {company.industry ?? "-"}
              </td>

              <td className="px-6 py-4">
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-2">
                <EditCompanyDialog
                company={company}
                />

                <DeleteCompanyDialog
                    id={company.id}
                    name={company.name}
                    />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}