import Header from "../pages/Header/Header";
import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const Login = lazy(() => import("../pages/Login/Login"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/header",
    element: <Header />
  }
];
