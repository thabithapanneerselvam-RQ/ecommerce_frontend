import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import ProtectedRoute from "./privateRoutes";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AddToCart = lazy(() => import("../pages/AddToCart/AddToCart"));

export const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/cart",
        element: <AddToCart />
      }
    ]
  }
];
