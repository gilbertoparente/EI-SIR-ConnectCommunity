import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

import AuthLayout from "../layouts/AuthLayout";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Groups from "../pages/Groups";
import GroupDetails from "../pages/GroupDetails";
import SessionDetails from "../pages/SessionDetails";
import Profile from "../pages/Profile";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Rotas públicas */}

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* Área autenticada */}

                <Route
                    element={
                        <ProtectedRoute>
                            <AuthLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/groups"
                        element={<Groups />}
                    />

                    <Route
                        path="/groups/:id"
                        element={<GroupDetails />}
                    />

                    <Route
                        path="/sessions/:id"
                        element={<SessionDetails />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;