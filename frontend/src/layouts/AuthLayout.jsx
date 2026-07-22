import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            {/* Navbar com a cor exata do fundo do logótipo */}
            <nav 
                className="navbar navbar-expand-lg navbar-dark shadow-sm"
                style={{ backgroundColor: "#18273E" }}
            >
                <div className="container-fluid px-4">
                    
                    {/* Logótipo e Título */}
                    <Link
                        to="/dashboard"
                        className="navbar-brand fw-bold d-flex align-items-center gap-2"
                    >
                        <img
                            src="/logo1.png"
                            alt="Logo"
                            className="d-inline-block align-text-top"
                            style={{ 
                                height: "40px", 
                                width: "auto", 
                                objectFit: "contain" 
                            }}
                        />
                        <span>ConnectCommunity</span>
                    </Link>

                    {/* Botões do Utilizador à Direita */}
                    <div className="ms-auto d-flex align-items-center gap-2">
                        <Link
                            to="/profile"
                            className="btn btn-outline-light btn-sm d-flex align-items-center"
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            {user?.name}
                        </Link>

                        <button
                            className="btn btn-danger btn-sm d-flex align-items-center"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </button>
                    </div>

                </div>
            </nav>

            {/* Conteúdo Principal */}
            <main className="container-fluid px-4 py-4 bg-light min-vh-100">
                <Outlet />
            </main>
        </>
    );
}

export default AuthLayout;