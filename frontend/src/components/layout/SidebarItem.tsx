import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  to: string;
};

export default function SidebarItem({
  icon,
  label,
  to,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
}