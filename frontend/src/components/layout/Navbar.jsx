import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold text-primary"
                    to="/"
                >
                    ConnectCommunity
                </Link>

                <div>

                    <Link
                        to="/login"
                        className="btn btn-outline-primary me-2"
                    >
                        Entrar
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-primary"
                    >
                        Criar Conta
                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;