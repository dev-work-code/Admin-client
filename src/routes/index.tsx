import RegisterScreen from "@/components/internal/AuthComponent/Register/RegisterScreen";
import DoctorDetailsPage from "@/components/internal/Doctor/DoctorDetailsPage";
import DoctorProfileStatusComponent from "@/components/internal/Doctor/DoctorReject";
import MapPage from "@/components/internal/Faclities/Maps/MapPage";
import LiveCaseProfile from "@/components/internal/LiveCases/LiveCasesProfile/LiveCaseProfile";
import AdRoleForm from "@/components/internal/Roles/AddRoles";
import RoleProfile from "@/components/internal/Roles/ProfilePage";
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
          path: "/driver/:driverId",
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
          path: "/doctor-details-status/:doctorId",
          element: <DoctorProfileStatusComponent />,
        },
        {
          path: "/mapspage",
          element: <MapPage />,
        },
        {
          path: "/profile/:id",
          element: <RoleProfile />,
        },
        {
          path: "/add-role",
          element: <AdRoleForm />,
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