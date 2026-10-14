import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getApplication } from "@/services/application";

import EditApplicationDialog from "@/components/applications/EditApplicationDialog";

type Props = {
  applicationId: string;
};

export default function OpportunityApplicationDialog({
  applicationId,
}: Props) {
  const [requested, setRequested] =
    useState(false);

  const {
    data: application,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () =>
      getApplication(applicationId),
    enabled: requested,
  });

  if (!requested) {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setRequested(true)}
      >
        <CheckCircle2 className="h-4 w-4" />
        Applied
      </Button>
    );
  }

  if (isLoading) {
    return (
      <Button
        variant="secondary"
        size="sm"
        disabled
      >
        Loading...
      </Button>
    );
  }

  if (isError || !application) {
    return (
      <Button
        variant="secondary"
        size="sm"
        disabled
      >
        Application unavailable
      </Button>
    );
  }

  return (
    <EditApplicationDialog
      application={application}
      trigger={
        <Button
          variant="secondary"
          size="sm"
        >
          <CheckCircle2 className="h-4 w-4" />
          Applied
        </Button>
      }
    />
  );
}