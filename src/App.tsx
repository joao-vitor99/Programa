import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { Home } from "./screens/Home";
import { Client } from "./screens/Client";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />
    },
    {
      path: ROUTES.CLIENTS,
      element: <Client />
    }

  ])

  return (
      <RouterProvider router={router} />
  )

}

export default App;
