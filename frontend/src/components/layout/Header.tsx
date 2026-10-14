import type { ReactNode } from "react";
import { Bell } from "lucide-react";

type HeaderProps = {
  title: string;
  subtitle: string;
  actions?: ReactNode;
};

export default function Header({
  title,
  subtitle,
  actions,
}: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-1 text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-5">
        {actions}

        <button className="rounded-xl bg-slate-800 p-3 text-slate-300 transition hover:bg-slate-700 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            A
          </div>

          <div>
            <p className="font-semibold text-white">
              Advait
            </p>

            <p className="text-sm text-slate-400">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}