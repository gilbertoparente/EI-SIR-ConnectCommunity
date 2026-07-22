import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGroupById } from "../services/groupService";

import { getResourcesByGroup } from "../services/resourceService";

import { getSessionsByGroup, deleteSession } from "../services/studySessionService";

import UploadResourceModal from "../components/resources/UploadResourceModal";
import ResourceList from "../components/resources/ResourceList";

import CreateSessionModal from "../components/sessions/CreateSessionModal";
import SessionList from "../components/sessions/SessionList";

function GroupDetails() {

    const { id } = useParams();

    const [group, setGroup] = useState(null);

    const [resources, setResources] = useState([]);

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);

    // ===========================
    // Recursos
    // ===========================

    const loadResources = async () => {

        try {

            const data = await getResourcesByGroup(id);

            setResources(data);

        } catch (error) {

            console.error(error);

        }

    };

    // ===========================
    // Sessões
    // ===========================

    const refreshSessions = async () => {

        try {

            const data = await getSessionsByGroup(id);

            setSessions(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDeleteSession = async (sessionId) => {

        if (!window.confirm("Eliminar esta sessão?")) {

            return;

        }

        try {

            await deleteSession(sessionId);

            refreshSessions();

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Erro ao eliminar sessão."

            );

        }

    };

    // ===========================
    // Carregar grupo
    // ===========================

    useEffect(() => {

        const loadGroup = async () => {

            try {

                const data = await getGroupById(id);

                setGroup(data);

                await loadResources();

                await refreshSessions();

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadGroup();

    }, [id]);

    // ===========================
    // Loading
    // ===========================

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

            </div>

        );

    }

    // ===========================
    // Grupo inexistente
    // ===========================

    if (!group) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">

                    Grupo não encontrado.

                </div>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <h1 className="fw-bold">

                {group.title}

            </h1>

            <p className="text-muted">

                {group.subject}

            </p>

            <p>

                {group.description}

            </p>

            <hr />

            <h4>

                Proprietário

            </h4>

            <p>

                {group.owner?.name}

            </p>

            <h4 className="mt-4">

                Membros ({group.members?.length})

            </h4>

            <ul className="list-group">

                {group.members?.map(member => (

                    <li
                        key={member._id}
                        className="list-group-item"
                    >

                        <strong>

                            {member.name}

                        </strong>

                        <small className="text-muted ms-2">

                            ({member.email})

                        </small>

                    </li>

                ))}

            </ul>

            <hr className="my-5" />

            <ul
                className="nav nav-tabs"
                role="tablist"
            >
                                <li className="nav-item">

                    <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#resources"
                        type="button"
                    >

                        📁 Recursos

                    </button>

                </li>

                <li className="nav-item">

                    <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#sessions"
                        type="button"
                    >

                        📅 Sessões

                    </button>

                </li>

              

            </ul>

            <div className="tab-content border border-top-0 rounded-bottom p-4 bg-white">

                {/* ===========================
                    RECURSOS
                =========================== */}

                <div
                    className="tab-pane fade show active"
                    id="resources"
                >

                    <UploadResourceModal

                        groupId={id}

                        refresh={loadResources}

                    />

                    <ResourceList

                        resources={resources}

                        onDelete={loadResources}

                    />

                </div>

                {/* ===========================
                    SESSÕES
                =========================== */}

                <div
                    className="tab-pane fade"
                    id="sessions"
                >

<SessionList

                        sessions={sessions}

                        onDelete={handleDeleteSession}

                        refresh={refreshSessions}

                    />

                    <CreateSessionModal

                        groupId={id}

                        refresh={refreshSessions}

                    />

                </div>





            </div>

        </div>

    );

}

export default GroupDetails;