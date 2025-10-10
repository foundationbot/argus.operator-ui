import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ColorModeProvider } from "./theme/ColorModeProvider";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  </StrictMode>
);
