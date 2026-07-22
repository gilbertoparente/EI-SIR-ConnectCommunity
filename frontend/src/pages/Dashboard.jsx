import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import socket, { connectSocket } from "../socket";

import PrivateChat from "../components/chat/PrivateChat";

function Dashboard() {
    const { user } = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        connectSocket();

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users);
        };

        socket.on("onlineUsers", handleOnlineUsers);
        socket.emit("getOnlineUsers");

        return () => {
            socket.off("onlineUsers", handleOnlineUsers);
        };
    }, []);

    return (
        <div className="container">
            {/* CABEÇALHO */}
            <div className="mb-4">
                <h2 className="fw-bold">
                    Bem-vindo, {user?.name}
                </h2>
                <p className="text-muted">
                    Bem-vindo ao ConnectCommunity.
                </p>
            </div>

            {/* TRÊS CARTÕES LADO A LADO: GRUPOS, ONLINE, CHAT PRIVADO */}
            <div className="row mb-5">
                
                {/* 1. GRUPOS */}
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-between">
                            <div>
                                <i className="bi bi-people-fill display-3 text-primary"></i>
                                <h4 className="mt-3">
                                    Grupos
                                </h4>
                                <p className="text-muted">
                                    Consulte os grupos onde participa e as respetivas sessões.
                                </p>
                            </div>
                            <div className="mt-3">
                                <Link
                                    to="/groups"
                                    className="btn btn-primary"
                                >
                                    Abrir Grupos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. UTILIZADORES ONLINE */}
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">
                            <strong>
                                Utilizadores Online
                            </strong>
                        </div>
                        <div
                            className="card-body"
                            style={{
                                height: "320px",
                                overflowY: "auto"
                            }}
                        >
                            {
                                onlineUsers
                                    .filter(u => u._id !== user?.id)
                                    .map(u => (
                                        <div
                                            key={u.socketId}
                                            className="card mb-2 border-0 shadow-sm"
                                        >
                                            <div className="card-body py-2 px-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6 className="mb-0">
                                                            🟢 {u.name}
                                                        </h6>
                                                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                            Online
                                                        </small>
                                                    </div>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => setSelectedUser(u)}
                                                    >
                                                        Mensagem
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                            {
                                onlineUsers.filter(u => u._id !== user?.id).length === 0 && (
                                    <div className="text-center text-muted mt-5">
                                        Nenhum utilizador online.
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* 3. CHAT PRIVADO */}
                <div className="col-md-4">
                    <div className="card shadow-sm h-100">
                        {
                            selectedUser ? (
                                <PrivateChat
                                    selectedUser={selectedUser}
                                />
                            ) : (
                                <>
                                    <div className="card-header">
                                        <strong>
                                            Chat Privado
                                        </strong>
                                    </div>
                                    <div
                                        className="card-body d-flex justify-content-center align-items-center"
                                        style={{
                                            height: "320px"
                                        }}
                                    >
                                        <div className="text-center text-muted">
                                            <i className="bi bi-chat-dots display-4"></i>
                                            <h5 className="mt-3">
                                                Inicie uma conversa
                                            </h5>
                                            <p className="mb-0">
                                                Escolha um utilizador online.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;