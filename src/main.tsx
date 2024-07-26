import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "@/routes/root.tsx";
import { Home } from "@/views/home.tsx";
import { About } from "@/views/about.tsx";
import { Login } from "@/views/login.tsx";
import { ProtectedRoutes } from "@/routes/protected-routes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: async () => {
      const res = await fetch("/api/me");
      if (res.status !== 200) {
        return null;
      }
      return await res.json();
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/private",
            element: <div>private!</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
