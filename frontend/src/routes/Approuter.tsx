import { Routes, Route } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}