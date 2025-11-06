import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";
import { getProjectEnvVariables } from "./shared/projectEnvVariables.ts";


// Import your Publishable Key
const projectEnvVariables = getProjectEnvVariables();
const PUBLISHABLE_KEY = projectEnvVariables.envVariables.VITE_CLERK_PUBLISHABLE_KEY;
const BACKEND_URL = projectEnvVariables.envVariables.VITE_BACKEND_URL;
const ENVIRONMENT_NAME = projectEnvVariables.envVariables.VITE_ENVIRONMENT_NAME;
const GENERATE_SOURCEMAP = projectEnvVariables.envVariables.VITE_GENERATE_SOURCEMAP;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

if (!BACKEND_URL) {
  throw new Error("Add your Backend URL to the .env file");
}

if (!ENVIRONMENT_NAME) {
  throw new Error("Add your Environment Name to the .env file");
}

if (!GENERATE_SOURCEMAP) {
  throw new Error("Add your Generate Sourcemap to the .env file");
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" signInUrl="/sign-in" signUpUrl="/sign-up">
      <BrowserRouter>
        <App />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
