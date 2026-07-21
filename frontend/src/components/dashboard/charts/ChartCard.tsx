import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  children: ReactNode;
};

export default function ChartCard({
  title,
  children,
}: ChartCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-semibold text-white">
        {title}
      </h2>

      {children}
    </div>
  );
}