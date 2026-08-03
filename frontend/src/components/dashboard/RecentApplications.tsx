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

    default:
      return "";
  }
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
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Recent Applications
        </CardTitle>

        <Link
          to="/applications"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All →
        </Link>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm">
              <th className="pb-3">Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Applied</th>
            </tr>
          </thead>

          <tbody>
            {data?.items.map((application) => (
              <tr
                key={application.id}
                className="border-b transition-colors hover:bg-muted/40"
              >
                <td className="py-4 font-medium">
                  {application.company}
                </td>

                <td>{application.role}</td>

                <td>
                  <Badge
                    className={getStatusVariant(
                      application.status
                    )}
                  >
                    {application.status}
                  </Badge>
                </td>

                <td>
                  {new Date(
                    application.date_applied
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}