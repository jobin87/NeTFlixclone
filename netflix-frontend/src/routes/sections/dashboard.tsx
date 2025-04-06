// import Login from "./pages/login";
import { lazy, Suspense } from "react";

const MoviePage = lazy(() => import("src/pages/dashboard/home"));
const AnimePage =  lazy(() => import("src/pages/dashboard/anime"));
const MovieDetailsPage = lazy(()=> import ("src/pages/dashboard/movie-details"))

import { Outlet } from "react-router-dom";
import { LoadingScreen } from "src/components/loading-screen";
import { DashboardLayout } from "src/layouts/dashboard";

const LayoutWrapper = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
    <Outlet />
  </Suspense>
  </DashboardLayout>
);
export const dashboardroutes = [
  {
    path: "/dashboard",
    element: <LayoutWrapper/>,
    children: [
      {path: "movie",element: <MoviePage />},
      {path: "anime",element: <AnimePage />},
      {path: "movie/:id",element: <MovieDetailsPage />},
    ],
  },
];
