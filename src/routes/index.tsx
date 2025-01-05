import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./routesProtection"; // Assuming ProtectedRoute is in the same folder

// Lazy load components
const DriverDetails = lazy(() => import("@/components/internal/Ambulance/DriverDetails"));
const RegisterScreen = lazy(() => import("@/components/internal/AuthComponent/Register/RegisterScreen"));
const DoctorDetailsPage = lazy(() => import("@/components/internal/Doctor/DoctorDetailsPage"));
const DoctorProfileStatusComponent = lazy(() => import("@/components/internal/Doctor/DoctorReject"));
const MapPage = lazy(() => import("@/components/internal/Faclities/Maps/MapPage"));
const PatientProfile = lazy(() => import("@/components/internal/Hospitals/HospitalProfile/PatientProfile"));
const LiveCaseProfile = lazy(() => import("@/components/internal/LiveCases/LiveCasesProfile/LiveCaseProfile"));
const AdRoleForm = lazy(() => import("@/components/internal/Roles/AddRoles"));
const RoleProfile = lazy(() => import("@/components/internal/Roles/ProfilePage"));
const HomeLayout = lazy(() => import("@/components/layout/HomeLayout"));
const Ambulance = lazy(() => import("@/pages/Ambulance"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const DoctorsPage = lazy(() => import("@/pages/Doctor"));
const Doctor = lazy(() => import("@/pages/Doctor"));
const DoctorProfilePage = lazy(() => import("@/pages/DoctorProfile"));
const HospitalProfil = lazy(() => import("@/pages/HospitalProfile"));
const HospitalReject = lazy(() => import("@/pages/HospitalReject"));
const Hospitals = lazy(() => import("@/pages/Hospitals"));
const LiveCases = lazy(() => import("@/pages/LiveCases"));
const Login = lazy(() => import("@/pages/Login"));
const Maps = lazy(() => import("@/pages/Maps"));
const NotFound = lazy(() => import("@/pages/notFound"));
const Profile = lazy(() => import("@/pages/Profile"));
const Roles = lazy(() => import("@/pages/Roles"));

export default function AppRouter() {
  const privateRoutes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <HomeLayout>
            <Outlet />
          </HomeLayout>
        </Suspense>
      ),
      children: [
        {
          element: <ProtectedRoute element={<Dashboard />} />,
          index: true,
        },
        {
          path: "/doctor",
          element: <ProtectedRoute element={<Doctor />} />,
        },
        {
          path: "/ambulance",
          element: <ProtectedRoute element={<Ambulance />} />,
        },
        {
          path: "/ambulance-driver-status/:driverId",
          element: <ProtectedRoute element={<DoctorProfileStatusComponent />} />,
        },
        {
          path: "/driver/:driverId",
          element: <ProtectedRoute element={<DriverDetails />} />,
        },
        {
          path: "/profile",
          element: <ProtectedRoute element={<Profile />} />,
        },
        {
          path: "/maps",
          element: <ProtectedRoute element={<Maps />} />,
        },
        {
          path: "/role",
          element: <ProtectedRoute element={<Roles />} />,
        },
        {
          path: "/dashboard",
          element: <ProtectedRoute element={<Dashboard />} />,
        },
        {
          path: "/livecases",
          element: <ProtectedRoute element={<LiveCases />} />,
        },
        {
          path: "/hospitals",
          element: <ProtectedRoute element={<Hospitals />} />,
        },
        {
          path: "/hospital/:hospitalId",
          element: <ProtectedRoute element={<HospitalProfil />} />,
        },
        {
          path: "/hospital-profile/:hospitalId",
          element: <ProtectedRoute element={<HospitalReject />} />,
        },
        {
          path: "/patient-profile/:patientId",
          element: <ProtectedRoute element={<PatientProfile />} />,
        },
        {
          path: "/doctor/:doctorId",
          element: <ProtectedRoute element={<DoctorProfilePage />} />,
        },
        {
          path: "/doctor",
          element: <ProtectedRoute element={<DoctorsPage />} />,
        },
        {
          path: "/doctor-details",
          element: <ProtectedRoute element={<DoctorDetailsPage />} />,
        },
        {
          path: "/doctor-details-status/:doctorId",
          element: <ProtectedRoute element={<DoctorProfileStatusComponent />} />,
        },
        {
          path: "/mapspage",
          element: <ProtectedRoute element={<MapPage />} />,
        },
        {
          path: "/profile/:id",
          element: <ProtectedRoute element={<RoleProfile />} />,
        },
        {
          path: "/add-role",
          element: <ProtectedRoute element={<AdRoleForm />} />,
        },
        {
          path: "/live-case-profile",
          element: <ProtectedRoute element={<LiveCaseProfile />} />,
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
      element: <ProtectedRoute element={<RegisterScreen />} isPublic />,
    },
    {
      path: "/login",
      element: <ProtectedRoute element={<Login />} isPublic />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];

  const routes = useRoutes([...privateRoutes, ...publicRoutes]);
  return routes;
}
