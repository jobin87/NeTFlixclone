// import Login from "./pages/login";
import { lazy } from "react";

const Moviepage = lazy(() => import("src/pages/dashboard/movies"));
const AnimePage = lazy(()=> import ("src/pages/dashboard/anime"))
import { Outlet } from "react-router-dom";
import HomeView from "src/sections/home/home-view";

export const dashboardroutes = [
  {
    path: "/dashboard",
    element: <Outlet />,
    children: [
      {path: "home",element: <HomeView />},
      {path: "movies",element: <Moviepage />},
      {path: "anime",element: <AnimePage />},
    ],
  },
];
