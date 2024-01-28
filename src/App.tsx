import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { Home } from "./screens/Home";
import { Clients } from "./screens/Clients";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <Home />,
      children: [{
        path: ROUTES.CLIENTS,
        element: <Clients />
      }]
    },

  ])

  return (
      <RouterProvider router={router} />
  )

}

export default App;
