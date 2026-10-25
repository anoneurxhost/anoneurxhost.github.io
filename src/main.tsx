import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import App from "./App.tsx";
import { ErrorBoundary } from "./pages/other/NotFound.tsx";
import "./index.css";
import "./styles/lab.css";
import logo from "./assets/logo.jpeg";

// Every public page lives under the /en-us locale prefix. Legacy addresses
// (and the "/{path}/index.html" form GitHub Pages serves) are rewritten in
// place before the router mounts, so each page always renders from a single
// canonical URL without a full page reload.
const LOCALE_PREFIX = "/en-us";

let pathname = window.location.pathname;
if (pathname.endsWith("/index.html")) {
  pathname = pathname.slice(0, -"/index.html".length) || "/";
  window.history.replaceState(
    null,
    "",
    `${pathname}${window.location.search}${window.location.hash}`,
  );
}
if (!pathname.startsWith(LOCALE_PREFIX)) {
  const rest = pathname === "/" ? "" : pathname;
  window.history.replaceState(
    null,
    "",
    `${LOCALE_PREFIX}${rest}${window.location.search}${window.location.hash}`,
  );
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const favicon =
  document.querySelector("link[rel='icon']") || document.createElement("link");

favicon.setAttribute("rel", "icon");
favicon.setAttribute("type", "image/jpeg");
favicon.setAttribute("href", logo);
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
