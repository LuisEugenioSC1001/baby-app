import config from "app/config";
import Loader from "components/Loader";
import Page404 from "layout/404/Page404";
import HomePageLayout from "layout/HomePageLayout";
import { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePageLayout />,
      children: [
        { path: "/", element: <Navigate to="/home" /> },
        ...config,
        { path: "404", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
