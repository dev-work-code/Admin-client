import HomeLayout from "@/components/layout/HomeLayout";
import Ambulance from "@/pages/Ambulance";
import Dashboard from "@/pages/dashboard";
import Doctor from "@/pages/Doctor";
import Home from "@/pages/home";
import Hospitals from "@/pages/Hospitals";
import LiveCases from "@/pages/LiveCases";
import Maps from "@/pages/Maps";
import NotFound from "@/pages/notFound";
import Profile from "@/pages/Profile";
import Roles from "@/pages/Roles";
import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

export default function AppRouter() {
  const privateRoutes = [
    {
      path: "/",
      element: (
        <HomeLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </HomeLayout>
      ),
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: "/doctor",
          element: <Doctor />,
        },
        {
          path: "/ambulance",
          element: <Ambulance />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/maps",
          element: <Maps />,
        },
        {
          path: "/role",
          element: <Roles />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/livecases",
          element: <LiveCases />,
        },
        {
          path: "/hospitals",
          element: <Hospitals />,
        },

      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/404",
      element: <NotFound />,
    },
    // {
    //   path: "/register",
    //   element: <RegisterScreen />,
    // },
    // {
    //   path: "/login",
    //   element: <LoginScreen />,
    // },
    // {
    //   path: "/login/otp",
    //   element: <OTPComponent />,
    // },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];

  const routes = useRoutes([...privateRoutes, ...publicRoutes]);
  return routes;
}