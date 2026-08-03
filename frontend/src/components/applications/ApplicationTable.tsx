import type { JobApplication } from "@/types/application";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import EditApplicationDialog from "./EditApplicationDialog";
import { Button } from "@/components/ui/button";
import DeleteApplicationDialog from "./DeleteApplicationDialog";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ApplicationActions from "./ApplicationActions";
import { formatDate } from "@/lib/date";




type Props = {
  applications: JobApplication[];
};

export default function ApplicationTable({
  applications,
}: Props) {
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b bg-muted/40 text-left">
              <th className="p-4">Company</th>
              <th>Role</th>
              <th>Source</th>
              <th>Status</th>
              <th>Applied</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <td className="p-4 font-medium">
                  {app.company}
                </td>

                <td>{app.role}</td>

                <td>{app.source}</td>

                <td>
                  <ApplicationStatusBadge
                    status={app.status}
                    />
                </td>

                <td>
                  {formatDate(app.date_applied)}
                </td>

                <td className="text-center">
                    <ApplicationActions
                        application={app}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}