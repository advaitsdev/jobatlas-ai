
import { uploadResume } from "@/services/resume";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);
    const [uploading, setUploading] =
  useState(false);

  const onDrop = useCallback(
  async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    setSelectedFile(file);

    try {
      setUploading(true);

      await uploadResume(file);

      toast.success(
        "Resume uploaded successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  },
  []
);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="space-y-6">

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all ${
          isDragActive
            ? "border-blue-500 bg-slate-800"
            : "border-slate-700 bg-slate-900 hover:border-blue-500"
        }`}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={60}
          className="mx-auto text-blue-500"
        />

        <h2 className="mt-6 text-2xl font-bold text-white">
          {isDragActive
            ? "Drop your resume here"
            : "Drag & Drop your Resume"}
        </h2>

        <p className="mt-3 text-slate-400">
          or click anywhere inside this area to browse files.
        </p>

        <p className="mt-6 text-sm text-slate-500">
          PDF only • Maximum 5MB
        </p>
      </div>

      {selectedFile && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">

          <div className="flex items-center gap-4">

            <FileText
              size={36}
              className="text-blue-500"
            />

            <div>

              <p className="font-semibold text-white">
                {selectedFile.name}
              </p>

              <p className="text-sm text-slate-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}