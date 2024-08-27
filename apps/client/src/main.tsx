import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "@/providers";

import "@/styles/tailwind.css";
import "@/styles/index.css";
import "@/styles/bs.css";

import { AppRoutes } from "@/routers/Routes";

import "@preact/signals-react/auto";
import { Toaster } from "@/components/Toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <AppRoutes />
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
