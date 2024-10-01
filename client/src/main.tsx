import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Board from "./pages/Board.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import CreateRecipe from "./pages/CreateRecipe.tsx";
import SearchRecipe from "./pages/SearchRecipes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      { path: "/search", element: <SearchRecipe /> },
      {
        path: "/create",
        element: <CreateRecipe />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
