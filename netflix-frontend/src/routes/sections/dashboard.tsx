// import Login from "./pages/login";
import { lazy } from "react";

const Contentpage = lazy(() => import("src/pages/dashboard/home"));
const AnimePage = lazy(()=> import ("src/pages/dashboard/anime"))
import { Outlet } from "react-router-dom";



export const dashboardroutes = [
  {
    path: "/dashboard",
    element: <Outlet />,
    children: [
      {path: "home",element: <Contentpage />},
      {path: "anime",element: <AnimePage />},
    ],
  },
];
