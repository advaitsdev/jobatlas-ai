import { Routes, Route, Navigate } from "react-router-dom";
import ResumeMatcherPage from "@/pages/ResumeMatcher";
import AppLayout from "@/layouts/AppLayout";
import ResumeHistory from "../pages/ResumeHistory";
import Dashboard from "@/pages/Dashboard";
import Opportunities from "@/pages/Opportunities";
import Analytics from "@/pages/Analytics";
import Resume from "@/pages/Resume";
import AIAssistant from "@/pages/AIAssistant";
import Settings from "@/pages/Settings";
import ResumeAnalysis from "@/components/Resume/ResumeAnalysis";
import ResumeAnalysisPage from "@/pages/ResumeAnalysisPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
  path="/dashboard"
  element={<Dashboard />}
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
          path="/resume-history"
          element={<ResumeHistory />}
        />
        <Route
        path="/resume/:id"
        element={<ResumeAnalysisPage />}
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