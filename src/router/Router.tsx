import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { APP_REGISTRY } from "./AppRegistry";
import { ProtectedRoute } from "../auth";
import Login from "../Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    handle: { label: "Login" },
  },
  {
    element: <ProtectedRoute />,
    children: [
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
    ],
  },
]);
