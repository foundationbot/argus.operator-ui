import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ColorModeProvider } from "./theme/ColorModeProvider";
import { AuthProvider } from "./auth";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ColorModeProvider>
        <RouterProvider router={router} />
      </ColorModeProvider>
    </AuthProvider>
  </StrictMode>
);
