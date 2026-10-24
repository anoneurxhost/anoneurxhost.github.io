import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import App from "./App.tsx";
import { ErrorBoundary } from "./pages/other/NotFound.tsx";
import "./index.css";
import "./styles/lab.css";
import logo from "./assets/logo.png";

// GitHub Pages serves the prerendered file as both `/lab` and `/lab/index.html`.
// Rewrite the file form to the clean URL before the router mounts so every
// address for a page renders the same content.
const pathname = window.location.pathname;
if (pathname.endsWith("/index.html")) {
  window.history.replaceState(
    null,
    "",
    `${pathname.slice(0, -"/index.html".length) || "/"}${window.location.search}${window.location.hash}`,
  );
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const favicon =
  document.querySelector("link[rel='icon']") || document.createElement("link");

favicon.setAttribute("rel", "icon");
// An SVG icon (used by the lab page) is left alone.
if (favicon.getAttribute("type") !== "image/svg+xml") {
  favicon.setAttribute("type", "image/png");
  favicon.setAttribute("href", logo);
}
document.head.appendChild(favicon);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MotionConfig>
    </HelmetProvider>
  </React.StrictMode>
);
