import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Bot,
  FileText,
  Settings,
  ScanSearch,
} from "lucide-react";


import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-900 p-6">
      <div className="mb-10">
  <h1 className="text-3xl font-bold text-white">
    JobAtlas<span className="text-blue-500">AI</span>
  </h1>

  <p className="mt-1 text-sm text-slate-400">
    AI-Powered Job Tracker
  </p>
</div>

      <nav className="space-y-2">
  <SidebarItem
  icon={<LayoutDashboard size={20} />}
  label="Dashboard"
  to="/dashboard"
/>

  <SidebarItem
  icon={<Briefcase size={20} />}
  label="Opportunities"
  to="/opportunities"
/>

  <SidebarItem
  icon={<BarChart3 size={20} />}
  label="Analytics"
  to="/analytics"
/>

    <SidebarItem
  icon={<Bot size={20} />}
  label="AI Assistant"
  to="/ai-assistant"
/>

  <SidebarItem
  icon={<FileText size={20} />}
  label="Resume"
  to="/resume"
/>

<SidebarItem
  icon={<ScanSearch size={20} />}
  label="Resume Matcher"
  to="/resume-matcher"
/>

  <SidebarItem
  icon={<Settings size={20} />}
  label="Settings"
  to="/settings"
/>
</nav>

      <div className="mt-auto rounded-xl border border-slate-700 bg-slate-800 p-4">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
      A
    </div>

    <div>
      <p className="font-semibold text-white">
        Advait
      </p>

      <p className="text-sm text-slate-400">
        Free Plan
      </p>
    </div>
  </div>
</div>
    </aside>
  );
}