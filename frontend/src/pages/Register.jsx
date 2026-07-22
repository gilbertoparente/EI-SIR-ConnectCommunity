import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: ""

    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            await register(formData);

            setSuccess("Conta criada com sucesso!");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            setError(

                error.response?.data?.message ||
                "Erro ao criar conta."

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

                                    Criar Conta

                                </h2>

                                <p className="text-muted">

                                    Junte-se à comunidade.

                                </p>

                            </div>

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}

                            {success && (

                                <div className="alert alert-success">

                                    {success}

                                </div>

                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Nome

                                    </label>

                                    <input

                                        type="text"
                                        name="name"
                                        className="form-control"

                                        value={formData.name}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input

                                        type="email"
                                        name="email"
                                        className="form-control"

                                        value={formData.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Palavra-passe

                                    </label>

                                    <input

                                        type="password"
                                        name="password"
                                        className="form-control"

                                        value={formData.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >

                                    Criar Conta

                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Já tem conta?

                                <Link
                                    to="/login"
                                    className="ms-2"
                                >

                                    Entrar

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

export default Register;