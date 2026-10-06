import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import OpportunitySelect from "./OpportunitySelect";

import type { OpportunityFormData } from "@/types/opportunity";

import { parseJobDescription } from "@/services/opportunity";

import { toast } from "sonner";

import { useState } from "react";


type Props = {
  form: OpportunityFormData;

  setForm: React.Dispatch<
    React.SetStateAction<OpportunityFormData>
  >;
};


export default function OpportunityForm({
  form,
  setForm,
}: Props) {
  const [isParsing, setIsParsing] =
    useState(false);


  const handleParseJobDescription =
    async () => {
      if (!form.job_description.trim()) {
        toast.error(
          "Paste a job description first."
        );

        return;
      }

      try {
        setIsParsing(true);

        const parsed =
          await parseJobDescription({
            job_description:
              form.job_description,
          });

        setForm((prev) => ({
          ...prev,

          title:
            parsed.title ??
            prev.title,

          location:
            parsed.location ??
            prev.location,

          employment_type:
            parsed.employment_type ??
            prev.employment_type,

          required_skills:
            parsed.required_skills,

          preferred_skills:
            parsed.preferred_skills,

          responsibilities:
            parsed.responsibilities,

          qualifications:
            parsed.qualifications,

          experience_required:
            parsed.experience_required ??
            "",

          education_required:
            parsed.education_required ??
            "",
        }));

        toast.success(
          "Job description parsed!"
        );
      } catch (error) {
        console.error(
          "Failed to parse job description:",
          error
        );

        toast.error(
          "Failed to parse job description."
        );
      } finally {
        setIsParsing(false);
      }
    };


  const updateArrayField = (
    field:
      | "required_skills"
      | "preferred_skills"
      | "responsibilities"
      | "qualifications",
    value: string
  ) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    setForm((prev) => ({
      ...prev,
      [field]: items,
    }));
  };


  const arrayToText = (
    items: string[]
  ) => {
    return items.join("\n");
  };


  const hasParsedDetails =
    form.required_skills.length > 0 ||
    form.preferred_skills.length > 0 ||
    form.responsibilities.length > 0 ||
    form.qualifications.length > 0 ||
    form.experience_required ||
    form.education_required;


  return (
    <div className="grid gap-4 py-4">

      {/* Job Title */}

      <Input
        placeholder="Job Title"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />


      {/* Company */}

      <OpportunitySelect
        value={form.company_id}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            company_id: value,
          }))
        }
      />


      {/* Location */}

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            location: e.target.value,
          }))
        }
      />


      {/* Employment Type */}

      <select
        className="rounded-md border px-3 py-2"
        value={form.employment_type}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            employment_type:
              e.target.value,
          }))
        }
      >
        <option value="">
          Employment Type
        </option>

        <option value="Internship">
          Internship
        </option>

        <option value="Full-Time">
          Full-Time
        </option>

        <option value="Part-Time">
          Part-Time
        </option>

        <option value="Contract">
          Contract
        </option>

        <option value="Freelance">
          Freelance
        </option>

        <option value="Remote">
          Remote
        </option>
      </select>


      {/* Source */}

      <Input
        placeholder="Source (e.g. LinkedIn, Naukri, Indeed)"
        value={form.source}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            source: e.target.value,
          }))
        }
      />


      {/* Salary */}

      <Input
        placeholder="Salary"
        value={form.salary}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            salary: e.target.value,
          }))
        }
      />


      {/* Application URL */}

      <Input
        placeholder="Application URL"
        value={form.application_url}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            application_url:
              e.target.value,
          }))
        }
      />


      {/* Deadline */}

      <Input
        type="date"
        value={form.deadline ?? ""}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            deadline: e.target.value,
          }))
        }
      />


      {/* Job Description */}

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Job Description
        </label>

        <textarea
          className="min-h-40 w-full rounded-md border p-3"
          placeholder="Paste Job Description"
          value={form.job_description}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              job_description:
                e.target.value,
            }))
          }
        />
      </div>


      {/* Parse Button */}

      <Button
        type="button"
        variant="outline"
        onClick={
          handleParseJobDescription
        }
        disabled={
          isParsing ||
          !form.job_description.trim()
        }
      >
        {isParsing
          ? "Parsing..."
          : "Parse Job Description"}
      </Button>


      {/* Parsed Details */}

      {hasParsedDetails && (
        <div className="space-y-6 rounded-lg border p-4">

          <div>
            <h3 className="text-lg font-semibold">
              Parsed Job Details
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Review and edit the extracted
              information before saving.
            </p>
          </div>


          {/* Required Skills */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Required Skills
            </label>

            <textarea
              className="min-h-24 w-full rounded-md border p-3 text-sm"
              placeholder={
                "One skill per line\nPython\nSQL\nFastAPI"
              }
              value={arrayToText(
                form.required_skills
              )}
              onChange={(e) =>
                updateArrayField(
                  "required_skills",
                  e.target.value
                )
              }
            />

            <p className="text-xs text-muted-foreground">
              Enter one skill per line.
            </p>
          </div>


          {/* Preferred Skills */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Preferred Skills
            </label>

            <textarea
              className="min-h-24 w-full rounded-md border p-3 text-sm"
              placeholder={
                "One skill per line\nDocker\nAWS\nKafka"
              }
              value={arrayToText(
                form.preferred_skills
              )}
              onChange={(e) =>
                updateArrayField(
                  "preferred_skills",
                  e.target.value
                )
              }
            />

            <p className="text-xs text-muted-foreground">
              Enter one skill per line.
            </p>
          </div>


          {/* Experience */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Experience Required
            </label>

            <Input
              placeholder="e.g. 2-4 years"
              value={
                form.experience_required
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  experience_required:
                    e.target.value,
                }))
              }
            />
          </div>


          {/* Education */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Education Required
            </label>

            <Input
              placeholder="e.g. Bachelor's degree in Computer Science"
              value={
                form.education_required
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  education_required:
                    e.target.value,
                }))
              }
            />
          </div>


          {/* Responsibilities */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Responsibilities
            </label>

            <textarea
              className="min-h-32 w-full rounded-md border p-3 text-sm"
              placeholder={
                "One responsibility per line"
              }
              value={arrayToText(
                form.responsibilities
              )}
              onChange={(e) =>
                updateArrayField(
                  "responsibilities",
                  e.target.value
                )
              }
            />

            <p className="text-xs text-muted-foreground">
              Enter one responsibility per line.
            </p>
          </div>


          {/* Qualifications */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Qualifications
            </label>

            <textarea
              className="min-h-32 w-full rounded-md border p-3 text-sm"
              placeholder={
                "One qualification per line"
              }
              value={arrayToText(
                form.qualifications
              )}
              onChange={(e) =>
                updateArrayField(
                  "qualifications",
                  e.target.value
                )
              }
            />

            <p className="text-xs text-muted-foreground">
              Enter one qualification per line.
            </p>
          </div>

        </div>
      )}


      {/* Notes */}

      <textarea
        className="min-h-24 w-full rounded-md border p-3"
        placeholder="Notes"
        value={form.notes}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            notes: e.target.value,
          }))
        }
      />

    </div>
  );
}