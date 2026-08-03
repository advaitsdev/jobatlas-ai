import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { JobApplication } from "@/types/application";

import EditApplicationDialog from "./EditApplicationDialog";
import DeleteApplicationDialog from "./DeleteApplicationDialog";

type Props = {
  application: JobApplication;
};

export default function ApplicationActions({
  application,
}: Props) {
  return (
    <div className="flex justify-center gap-2">
      <EditApplicationDialog
        application={application}
      />

      <DeleteApplicationDialog
        id={application.id}
        company={application.company}
      />
    </div>
  );
}