// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { getAuthCookies } from "@/utils/cookies"; // Import your cookie utility function

interface ProtectedRouteProps {
    element: JSX.Element;
    isPublic?: boolean; // Prop to determine if route is public
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isPublic }) => {
    const authUser = getAuthCookies();

    // If the user is logged in and trying to access login/register, redirect to home/dashboard
    if (authUser && authUser.token) {
        if (isPublic) {
            return <Navigate to="/" replace />; // Redirect to home/dashboard
        }
    }

    // If the route is public and user is authenticated, redirect to the dashboard
    if (isPublic && authUser && authUser.token) {
        return <Navigate to="/" replace />;
    }

    // Check if the user is authenticated for protected routes
    if (!isPublic && (!authUser || !authUser.token)) {
        return <Navigate to="/login" replace />;
    }

    // If the user is allowed, render the requested element
    return element;
};
