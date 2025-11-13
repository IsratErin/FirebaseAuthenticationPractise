import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/main";
import Login from "./components/Login/login";
import Home from "./components/Home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
