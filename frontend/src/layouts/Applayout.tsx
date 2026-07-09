import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}

      <aside className="w-72 border-r border-slate-800 bg-slate-900">
        Sidebar
      </aside>

      {/* Main */}

      <div className="flex flex-1 flex-col">
        {/* Header */}

        <header className="h-16 border-b border-slate-800 bg-slate-900">
          Header
        </header>

        {/* Page */}

        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}