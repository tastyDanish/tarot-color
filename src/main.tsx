import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PostHogProvider } from "@posthog/react";

const options = {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: "2026-05-30",
  opt_out_capturing_by_default: !import.meta.env.PROD,
} as const;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN}
      options={options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>
);
