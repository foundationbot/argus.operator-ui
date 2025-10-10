import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { APP_REGISTRY } from "./AppRegistry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    handle: { label: "Operator UI" },
    children: APP_REGISTRY.map((e) =>
      e.index
        ? { index: true, element: e.element, handle: { label: e.label, nav: !!e.nav, icon: e.icon } }
        : { path: e.path!, element: e.element, handle: { label: e.label, nav: !!e.nav, icon: e.icon } }
    ),
  },
]);
