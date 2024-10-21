import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./Home.jsx"
import { Login } from "./pages/Login.jsx"
import { Register } from "./pages/Register.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>404 Not Found</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
