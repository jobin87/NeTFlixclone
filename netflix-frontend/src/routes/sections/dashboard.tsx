// import Login from "./pages/login";
import { lazy, Suspense } from "react";

const MoviePage = lazy(() => import("src/pages/dashboard/movie"));
const HomePage = lazy(() => import("src/pages/dashboard/home"));
const AnimePage =  lazy(() => import("src/pages/dashboard/anime"));
const MovieDetailsPage = lazy(()=> import ("src/pages/dashboard/movie.tsx"))


import { Outlet } from "react-router-dom";
import { LoadingScreen } from "src/components/loading-screen";
import { DashboardLayout } from "src/layouts/dashboard";
import { MovieSubView } from "src/sections/dashboard/movie/movie-subview";
import SearchPage from "src/sections/dashboard/search";

const LayoutWrapper = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
    <Outlet />
  </Suspense>
  </DashboardLayout>
);
export const dashboardroutes = [
  // Routes that use the DashboardLayout
  {
    path: "/dashboard",
    element: <LayoutWrapper />,
    children: [
      { path: "home", element: <MoviePage /> },
      { path: "movie", element: <HomePage/> },
      { path: "search", element: <SearchPage /> },
      { path: "anime", element: <AnimePage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
    ],
  },

  // Route that does NOT use DashboardLayout
  {
    path: "/dashboard/subview",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <MovieSubView />
      </Suspense>
    ),
  },
];
