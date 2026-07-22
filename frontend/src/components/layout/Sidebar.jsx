import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { logout } = useAuth();

    const location = useLocation();

    const isActive = (path) => {

        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }

        return location.pathname.startsWith(path);

    };

    return (

        <div
            className="bg-dark text-white d-flex flex-column p-4"
            style={{
                width: "260px",
                minHeight: "100vh"
            }}
        >

            <h3 className="fw-bold text-center mb-5">

                ConnectCommunity

            </h3>

            <div className="d-grid gap-2">

                <Link
                    to="/dashboard"
                    className={`btn text-start ${
                        isActive("/dashboard")
                            ? "btn-primary"
                            : "btn-outline-light"
                    }`}
                >
                    <i className="bi bi-house-door-fill me-2"></i>
                    Dashboard
                </Link>

                <Link
                    to="/groups"
                    className={`btn text-start ${
                        isActive("/groups")
                            ? "btn-primary"
                            : "btn-outline-light"
                    }`}
                >
                    <i className="bi bi-people-fill me-2"></i>
                    Grupos
                </Link>

                <Link
                    to="/dashboard"
                    className="btn btn-outline-light text-start"
                >
                    <i className="bi bi-calendar-event-fill me-2"></i>
                    Sessões
                </Link>

                <Link
                    to="/dashboard"
                    className="btn btn-outline-light text-start"
                >
                    <i className="bi bi-folder-fill me-2"></i>
                    Recursos
                </Link>

                <Link
                    to="/profile"
                    className={`btn text-start ${
                        isActive("/profile")
                            ? "btn-primary"
                            : "btn-outline-light"
                    }`}
                >
                    <i className="bi bi-person-circle me-2"></i>
                    Perfil
                </Link>

            </div>

            <div className="mt-auto">

                <hr className="border-secondary" />

                <button
                    className="btn btn-danger w-100"
                    onClick={logout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;