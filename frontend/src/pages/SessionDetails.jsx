import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";
import { getSessionById } from "../services/studySessionService";
import { getMessagesBySession } from "../services/chatService";



function SessionDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const [session, setSession] = useState(null);

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    const [loading, setLoading] = useState(true);

useEffect(() => {

    const loadData = async () => {

        try {

            const sessionData = await getSessionById(id);

            setSession(sessionData);

            const chatHistory = await getMessagesBySession(id);

            setMessages(chatHistory);

            socket.connect();

            socket.emit("joinSession", id);

            socket.on("receiveMessage", (message) => {

                setMessages(previous => [

                    ...previous,

                    message

                ]);

            });

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    loadData();

    return () => {

        socket.off("receiveMessage");

        socket.disconnect();

    };

}, [id]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        socket.auth = {

            token

        };

        socket.connect();

        socket.emit(

            "joinSession",

            id

        );

        socket.on(

            "receiveMessage",

            (message) => {

                setMessages(

                    previous => [

                        ...previous,

                        message

                    ]

                );

            }

        );

        return () => {

            socket.off("receiveMessage");

            socket.disconnect();

        };

    }, [id]);

const handleSendMessage = () => {

    if (!newMessage.trim()) {

        return;

    }

    socket.emit("sendMessage", {

        sessionId: id,

        message: newMessage

    });

    setNewMessage("");

};

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

            </div>

        );

    }

    if (!session) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">

                    Sessão não encontrada.

                </div>

            </div>

        );

    }
return (

    <div className="container py-5">

        <button
            className="btn btn-outline-secondary mb-4"
            onClick={() => navigate(-1)}
        >
            ← Voltar ao Grupo
        </button>

        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h2 className="fw-bold">

                    {session.title}

                </h2>

                <p className="text-muted">

                    {session.description}

                </p>

                <hr />

                <p>

                    <strong>📅 Data:</strong>{" "}

                    {new Date(session.date).toLocaleString()}

                </p>

                <p>

                    <strong>📍 Local:</strong>{" "}

                    {session.location || "Sem localização"}

                </p>

                <p>

                    <strong>👤 Criador:</strong>{" "}

                    {session.createdBy?.name}

                </p>

                <p>

                    <strong>👥 Participantes:</strong>{" "}

                    {session.participants.length}/{session.maxParticipants}

                </p>

            </div>

        </div>

        <div className="row">

            {/* Participantes */}

            <div className="col-md-4">

                <div className="card shadow-sm">

                    <div className="card-header">

                        <h5>

                            Participantes

                        </h5>

                    </div>

                    <ul className="list-group list-group-flush">

                        {

                            session.participants.map(participant => (

                                <li

                                    key={participant._id}

                                    className="list-group-item"

                                >

                                    <strong>

                                        {participant.name}

                                    </strong>

                                    <br />

                                    <small className="text-muted">

                                        {participant.email}

                                    </small>

                                </li>

                            ))

                        }

                    </ul>

                </div>

            </div>

            {/* Chat */}

            <div className="col-md-8">

                <div className="card shadow-sm">

                    <div className="card-header">

                        <h5>

                            💬 Chat da Sessão

                        </h5>

                    </div>

                    <div

                        className="card-body"

                        style={{

                            height: "450px",

                            overflowY: "auto",

                            background: "#f8f9fa"

                        }}

                    >

                        {

                            messages.length === 0 && (

                                <div className="text-center text-muted mt-5">

                                    Ainda não existem mensagens.

                                </div>

                            )

                        }

                        {

                            messages.map(message => {

                                const mine =

                                    message.sender?._id === user?.id ||

                                    message.sender === user?.id;

                                return (

                                    <div

                                        key={message._id}

                                        className={`d-flex mb-3 ${mine ? "justify-content-end" : "justify-content-start"}`}

                                    >

                                        <div

                                            className={`p-3 rounded shadow-sm ${mine ? "bg-primary text-white" : "bg-white"}`}

                                            style={{

                                                maxWidth: "75%"

                                            }}

                                        >

                                            <strong>

                                                {

                                                    message.sender?.name ||

                                                    "Utilizador"

                                                }

                                            </strong>

                                            <br />

                                            {

                                                message.message

                                            }

                                            <br />

                                            <small>

                                                {

                                                    new Date(

                                                        message.createdAt

                                                    ).toLocaleTimeString()

                                                }

                                            </small>

                                        </div>

                                    </div>

                                );

                            })

                        }

                    </div>

                    <div className="card-footer">

                        <div className="input-group">

                            <input

                                className="form-control"

                                value={newMessage}

                                onChange={e =>

                                    setNewMessage(

                                        e.target.value

                                    )

                                }

                                placeholder="Escreva uma mensagem..."

                                onKeyDown={e => {

                                    if (e.key === "Enter") {

                                        handleSendMessage();

                                    }

                                }}

                            />

                            <button

                                className="btn btn-primary"

                                onClick={handleSendMessage}

                            >

                                Enviar

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);

}

export default SessionDetails;