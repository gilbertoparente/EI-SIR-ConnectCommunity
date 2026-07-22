import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const data = await loginService(email, password);

            login(data.user, data.token);

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Erro ao iniciar sessão."
            );

        }

    };

    return (

        <div className="container">

            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <img
                                    src="/logo.png"
                                    alt="ConnectCommunity"
                                    style={{ width: "120px" }}
                                />

                                <h2 className="mt-3 fw-bold">

                                    Bem-vindo!

                                </h2>

                                <p className="text-muted">

                                    Inicie sessão para continuar.

                                </p>

                            </div>

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input

                                        type="email"

                                        className="form-control"

                                        value={email}

                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }

                                        required

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Palavra-passe

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        value={password}

                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }

                                        required

                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >

                                    Entrar

                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Ainda não tem conta?

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >

                                    Criar Conta

                                </Link>

                            </p>

                            <p className="text-center mt-3">

                                <Link to="/">

                                    ← Voltar à página inicial

                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;