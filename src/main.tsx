import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ErrorBoundary } from "./pages/other/NotFound.tsx";
import "./index.css";
import logo from "./assets/logo.jpeg";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const favicon =
  document.querySelector("link[rel='icon']") || document.createElement("link");

favicon.setAttribute("rel", "icon");
favicon.setAttribute("type", "image/png");
favicon.setAttribute("href", logo);
document.head.appendChild(favicon);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
