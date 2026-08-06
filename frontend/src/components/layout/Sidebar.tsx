import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Applications", path: "/applications" },
  { name: "Resume", path: "/resume" },
  { name: "Resume Matcher", path: "/resume-matcher" },
  { name: "Companies", path: "/companies" },
  { name: "Opportunities", path: "/opportunities" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">JobAtlasAI</h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}