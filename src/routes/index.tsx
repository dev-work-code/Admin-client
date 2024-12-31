import RegisterScreen from "@/components/internal/AuthComponent/Register/RegisterScreen";
import DoctorDetailsPage from "@/components/internal/Doctor/DoctorDetailsPage";
import MapPage from "@/components/internal/Faclities/MapPage";
import LiveCaseProfile from "@/components/internal/LiveCases/LiveCasesProfile/LiveCaseProfile";
import HomeLayout from "@/components/layout/HomeLayout";
import Ambulance from "@/pages/Ambulance";
import Dashboard from "@/pages/dashboard";
import DoctorsPage from "@/pages/Doctor";
import Doctor from "@/pages/Doctor";
import DoctorProfilePage from "@/pages/DoctorProfile";
import Home from "@/pages/home";
import HospitalProfil from "@/pages/HospitalProfile";
import HospitalReject from "@/pages/HospitalReject";
import Hospitals from "@/pages/Hospitals";
import LiveCases from "@/pages/LiveCases";
import Login from "@/pages/Login";
import Maps from "@/pages/Maps";
import NotFound from "@/pages/notFound";
import Profile from "@/pages/Profile";
import ProfileRolePage from "@/pages/ProfileRole";
import ProfileRole from "@/pages/ProfileRole";
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
        {
          path: "/hospital/:hospitalId",
          element: <HospitalProfil />,
        },
        {
          path: "/hospital-profile/:hospitalId",
          element: <HospitalReject />,
        },
        {
          path: "/doctor/:doctorId",
          element: <DoctorProfilePage />,
        },
        {
          path: "/doctor",
          element: <DoctorsPage />,
        },
        {
          path: "/doctor-details",
          element: <DoctorDetailsPage />,
        },
        {
          path: "/mapspage",
          element: <MapPage />,
        },
        {
          path: "/profile/:id",
          element: <ProfileRole />,
        },
        {
          path: "/add-role",
          element: <ProfileRolePage />,
        },
        {
          path: "/live-case-profile",
          element: <LiveCaseProfile />,
        },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];

  const routes = useRoutes([...privateRoutes, ...publicRoutes]);
  return routes;
}