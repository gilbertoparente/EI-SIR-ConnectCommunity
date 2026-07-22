import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import LandingPage from "../../pages/LandingPage";

function ProtectedRoute({ children }) {

    const { token } = useAuth();

    if (!token) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;