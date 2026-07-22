import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    joinSession,
    leaveSession
} from "../../services/studySessionService";

function SessionCard({

    session,

    onDelete,

    refresh

}) {

    const navigate = useNavigate();

    const { user } = useAuth();

    const isParticipant = session.participants?.some(

        participant =>

            participant._id === user?.id ||

            participant === user?.id

    );

    const isCreator =

        session.createdBy?._id === user?.id ||

        session.createdBy === user?.id;

    const handleJoin = async () => {

        try {

            await joinSession(session._id);

            refresh();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Erro ao entrar na sessão."

            );

        }

    };

    const handleLeave = async () => {

        try {

            await leaveSession(session._id);

            refresh();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Erro ao sair da sessão."

            );

        }

    };

    return (

        <div className="card shadow-sm mb-3">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <h5>

                            {session.title}

                        </h5>

                        <p className="mb-1 text-muted">

                            {session.description}

                        </p>

                        <p className="mb-1">

                            📅 {new Date(session.date).toLocaleString()}

                        </p>

                        <p className="mb-1">

                            📍 {session.location || "Sem localização"}

                        </p>

                        {session.calendarLink && (

                            <p className="mb-2">

                                🔗

                                <a

                                    href={session.calendarLink}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="ms-2"

                                >

                                    Abrir ligação

                                </a>

                            </p>

                        )}

                        <p className="mb-0">

                            👥 {session.participants?.length || 0} / {session.maxParticipants}

                        </p>

                    </div>

                    <div className="d-flex flex-column gap-2">

                        <button

                            className="btn btn-primary"

                            onClick={() => navigate(`/sessions/${session._id}`)}

                        >

                            Abrir

                        </button>

                        {!isParticipant ? (

                            <button

                                className="btn btn-success"

                                onClick={handleJoin}

                            >

                                Entrar

                            </button>

                        ) : (

                            !isCreator && (

                                <button

                                    className="btn btn-warning"

                                    onClick={handleLeave}

                                >

                                    Sair

                                </button>

                            )

                        )}

                        {isCreator && (

                            <button

                                className="btn btn-danger"

                                onClick={() => onDelete(session._id)}

                            >

                                Eliminar

                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SessionCard;