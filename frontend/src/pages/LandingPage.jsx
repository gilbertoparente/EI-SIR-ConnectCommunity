import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function LandingPage() {
    return (
        <>
            <Navbar />

            <div className="container">

                {/* Hero Section */}
                <section className="py-5" style={{ minHeight: "80vh" }}>
                    
                    {/* 1. Logótipo Centrado no Topo */}
                    <div className="text-center mb-5">
                        <img
                            src="/logo.png"
                            alt="ConnectCommunity"
                            className="img-fluid"
                            style={{ maxHeight: "210px", objectFit: "contain" }}
                        />
                    </div>

                    {/* 2. Texto à Esquerda e Imagem à Direita */}
                    <div className="row align-items-center justify-content-between">
                        
                        {/* Coluna do Texto */}
                        <div className="col-lg-6 pe-lg-4 mb-5 mb-lg-0">
                            <h1 className="display-4 fw-bold lh-base">
                                Aprender é melhor
                                <span className="text-primary"> em conjunto.</span>
                            </h1>

                            <p className="lead text-muted mt-3 mb-4">
                                O ConnectCommunity é uma plataforma colaborativa
                                desenvolvida para estudantes do ensino superior,
                                permitindo criar grupos de estudo, organizar
                                sessões, partilhar recursos académicos e comunicar
                                em tempo real.
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                                <Link
                                    to="/login"
                                    className="btn btn-primary btn-lg px-4"
                                >
                                    Entrar
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-outline-primary btn-lg px-4"
                                >
                                    Criar Conta
                                </Link>
                            </div>
                        </div>

                        {/* Coluna da Imagem / Ilustração */}
                        <div className="col-lg-5 text-center">
                            <img
                                src="/hero.svg"
                                alt="Students Illustration"
                                className="img-fluid"
                                style={{ maxHeight: "400px" }}
                            />
                        </div>

                    </div>
                </section>

                {/* Funcionalidades */}
                <section className="py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Principais Funcionalidades</h2>
                        <p className="text-muted">Tudo o que precisas para gerir os teus estudos num só lugar.</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-3 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm text-center p-3">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-people-fill display-5 text-primary"></i>
                                    </div>
                                    <h5 className="fw-bold">Grupos</h5>
                                    <p className="text-muted small mb-0">
                                        Cria e gere grupos de estudo por disciplina de forma simples.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm text-center p-3">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-calendar-event display-5 text-success"></i>
                                    </div>
                                    <h5 className="fw-bold">Sessões</h5>
                                    <p className="text-muted small mb-0">
                                        Agenda sessões de estudo presenciais ou online com os colegas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm text-center p-3">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-folder2-open display-5 text-warning"></i>
                                    </div>
                                    <h5 className="fw-bold">Recursos</h5>
                                    <p className="text-muted small mb-0">
                                        Partilha apontamentos, resumos e documentos úteis.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm text-center p-3">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-chat-dots-fill display-5 text-info"></i>
                                    </div>
                                    <h5 className="fw-bold">Chat</h5>
                                    <p className="text-muted small mb-0">
                                        Comunica em tempo real de forma privada ou em grupo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Secção Objetivo e Vantagens Juntas */}
                <section className="py-5">
                    <div className="row g-4 align-items-stretch">
                        
                        {/* O nosso objetivo */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm h-100 bg-white">
                                <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-center">
                                    <h3 className="fw-bold mb-3">O nosso objetivo</h3>
                                    <p className="text-muted mb-0">
                                        O ConnectCommunity pretende promover a aprendizagem colaborativa,
                                        facilitando a comunicação, organização e partilha de conhecimento 
                                        entre estudantes através de uma plataforma simples, intuitiva e acessível.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Porque escolher */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm h-100 bg-light">
                                <div className="card-body p-4 p-lg-5">
                                    <h3 className="fw-bold mb-4">Porque escolher?</h3>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <p className="mb-2">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                Organização estruturada de grupos de estudo.
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p className="mb-2">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                Comunicação instantânea e em tempo real.
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p className="mb-2">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                Partilha facilitada de apontamentos e recursos.
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <p className="mb-0">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                Gestão centralizada de sessões de estudo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4 mt-5">
                <div className="container">
                    <h5 className="mb-2 fw-bold">ConnectCommunity</h5>
                    <p className="text-muted mb-2 small">Plataforma colaborativa para estudantes do ensino superior.</p>
                    <small className="text-muted">
                        © 2026 ConnectCommunity — Todos os direitos reservados.
                    </small>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;