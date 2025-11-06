import { Route, Routes } from "react-router";

// pages
import Index from "@/pages/index";
import DefaultLayout from "@/layout/default";
import { ThemeProvider } from "@/components/theme-provider";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import AboutUsPage from "@/pages/about-us";
import NotFoundPage from "@/pages/not-found";
import ContactUsPage from "./pages/contact-us";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Index />
            </DefaultLayout>
          }
        />
        <Route
          path="/about"
          element={
            <DefaultLayout>
              <AboutUsPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <DefaultLayout>
              <ContactUsPage />
            </DefaultLayout>
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="*"
          element={
            <DefaultLayout>
              <NotFoundPage />
            </DefaultLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
