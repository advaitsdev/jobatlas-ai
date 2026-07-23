import { Routes, Route, Navigate } from "react-router-dom";
import ResumeMatcherPage from "@/pages/ResumeMatcher";
import AppLayout from "@/layouts/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Opportunities from "@/pages/Opportunities";
import Analytics from "@/pages/Analytics";
import Resume from "@/pages/Resume";
import AIAssistant from "@/pages/AIAssistant";
import Settings from "@/pages/Settings";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/opportunities"
          element={<Opportunities />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/resume"
          element={<Resume />}
        />
        <Route
  path="/resume-matcher"
  element={<ResumeMatcherPage />}
/>

        <Route
          path="/ai-assistant"
          element={<AIAssistant />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
}