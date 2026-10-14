import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

import type { JobApplication } from "@/types/application";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ApplicationActions from "./ApplicationActions";

import { formatDate } from "@/lib/date";

import { updateApplication } from "@/services/application";

type Props = {
  applications: JobApplication[];
};

const statuses = [
  "Applied",
  "Interview",
  "HR",
  "Offer",
  "Rejected",
  "Ghosted",
  "Withdrawn",
];

export default function ApplicationTable({
  applications,
}: Props) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: ({
      application,
      status,
    }: {
      application: JobApplication;
      status: string;
    }) =>
      updateApplication(application.id, {
        company: application.company,
        role: application.role,
        location: application.location ?? "",
        source: application.source,
        job_url: application.job_url,
        status,
        salary: application.salary ?? "",
        date_applied: application.date_applied,
        notes: application.notes ?? "",
      }),

    onSuccess: () => {
      toast.success("Application status updated!");

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: () => {
      toast.error("Failed to update application status.");
    },
  });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="sticky top-0 z-10 bg-background">
              <tr className="border-b bg-muted/40 text-left text-sm">
                <th className="p-4 font-medium">Company</th>
                <th className="font-medium">Role</th>
                <th className="font-medium">Source</th>
                <th className="font-medium">Status</th>
                <th className="font-medium">Applied</th>
                <th className="text-center font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b last:border-0 transition-colors hover:bg-muted/30"
                >
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        {app.company}
                      </span>

                      {app.location && (
                        <span className="text-xs text-muted-foreground">
                          {app.location}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span className="font-medium">
                      {app.role}
                    </span>
                  </td>

                  <td className="text-muted-foreground">
                    {app.source || "—"}
                  </td>

                  <td>
                    <select
                      value={app.status}
                      disabled={statusMutation.isPending}
                      onChange={(event) =>
                        statusMutation.mutate({
                          application: app,
                          status: event.target.value,
                        })
                      }
                      className="cursor-pointer rounded-md border bg-background px-2 py-1 text-sm outline-none transition-colors hover:bg-muted focus:ring-2 focus:ring-ring"
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    <div className="mt-1">
                      <ApplicationStatusBadge
                        status={app.status}
                      />
                    </div>
                  </td>

                  <td className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(app.date_applied)}
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-2">
                      {app.job_url && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          title="Open job posting"
                        >
                          <a
                            href={app.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">
                              Open job posting
                            </span>
                          </a>
                        </Button>
                      )}

                      <ApplicationActions
                        application={app}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}