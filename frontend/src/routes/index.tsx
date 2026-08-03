import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import Dashboard from "@/pages/Dashboard";
import Applications from "@/pages/Applications";
import Resume from "@/pages/Resume";
import Companies from "@/pages/Companies";
import Opportunities from "@/pages/Opportunities";
import Settings from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "opportunities",
        element: <Opportunities />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);