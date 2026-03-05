import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./02-infrastructure/router/routes";

const router = createBrowserRouter(routes);

export function App() {
  return <RouterProvider router={router} />;
}
