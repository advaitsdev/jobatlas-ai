import type { Opportunity } from "@/types/opportunity";
import OpportunityStatusBadge from "./OpportunityStatusBadge";
type Props = {
  opportunities: Opportunity[];
};
import OpportunityActions from "./OpportunityActions";
export default function OpportunityTable({
  opportunities,
}: Props) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-4 text-left">Title</th>
            <th className="px-6 py-4 text-left">Company</th>
            <th className="px-6 py-4 text-left">Location</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Deadline</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((opportunity) => (
            <tr
              key={opportunity.id}
              className="border-b"
            >
              <td className="px-6 py-4 font-medium">
                {opportunity.title}
              </td>

              <td className="px-6 py-4">
                {opportunity.company.name}
              </td>

              <td className="px-6 py-4">
                {opportunity.location ?? "-"}
              </td>

              <td className="px-6 py-4">
                <OpportunityStatusBadge
                    status={opportunity.status}
                />
              </td>

              <td className="px-6 py-4">
                {opportunity.deadline ?? "-"}
              </td>

              <td className="px-6 py-4 text-center">
                <OpportunityActions
                    opportunity={opportunity}
                    />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}