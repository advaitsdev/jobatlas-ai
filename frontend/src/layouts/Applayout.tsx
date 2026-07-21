import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header
  title="Dashboard"
  subtitle="Welcome back, Advait 👋"
/>

        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}