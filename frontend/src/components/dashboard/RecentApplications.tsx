import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getApplications } from "@/services/application";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EditApplicationDialog from "@/components/applications/EditApplicationDialog";

function getStatusVariant(status: string) {
  switch (status) {
    case "Offer":
      return "bg-green-100 text-green-700";

    case "Interview":
      return "bg-orange-100 text-orange-700";

    case "HR":
      return "bg-purple-100 text-purple-700";

    case "Applied":
      return "bg-blue-100 text-blue-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Ghosted":
      return "bg-gray-100 text-gray-700";

    case "Withdrawn":
      return "bg-slate-100 text-slate-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RecentApplications() {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-applications"],
    queryFn: () =>
      getApplications({
        page: 1,
        limit: 5,
        sort: "desc",
      }),
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Loading recent applications...
          </p>
        </CardContent>
      </Card>
    );
  }

  const applications = data?.items ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Applications</CardTitle>

        <Link
          to="/applications"
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
        >
          View All →
        </Link>
      </CardHeader>

      <CardContent>
        {applications.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="font-medium">No applications yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your recent applications will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Applied</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b last:border-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="py-4 pr-6 font-medium">
                      <EditApplicationDialog
                        application={application}
                        trigger={
                          <button
                            type="button"
                            className="text-left transition-colors hover:text-blue-600 hover:underline"
                          >
                            {application.company}
                          </button>
                        }
                      />
                    </td>

                    <td className="py-4 pr-6">
                      {application.role}
                    </td>

                    <td className="py-4 pr-6 text-sm text-muted-foreground">
                      {application.source || "—"}
                    </td>

                    <td className="py-4 pr-6">
                      <Badge
                        className={getStatusVariant(
                          application.status
                        )}
                      >
                        {application.status}
                      </Badge>
                    </td>

                    <td className="py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(application.date_applied)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}