import type { Company } from "@/types/company";

import EditCompanyDialog from "./EditCompanyDialog";
import DeleteCompanyDialog from "./DeleteCompanyDialog";

type Props = {
  company: Company;
};

export default function CompanyActions({
  company,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      <EditCompanyDialog
        company={company}
      />

      <DeleteCompanyDialog
        id={company.id}
        name={company.name}
      />
    </div>
  );
}