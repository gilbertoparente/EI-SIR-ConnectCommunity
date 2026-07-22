import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    joinGroup,
    leaveGroup,
    deleteGroup
} from "../../services/groupService";

function GroupCard({ group, refreshGroups }) {

    const navigate = useNavigate();

    const { user } = useAuth();

    const isOwner = group.owner?._id === user?.id;

        const isMember = group.members.some(
            member => member._id === user?.id
        );
    const handleJoin = async () => {

        try {

            await joinGroup(group._id);

            refreshGroups();

            navigate(`/groups/${group._id}`);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao entrar no grupo."
            );

        }

    };

    const handleLeave = async () => {

        if (!window.confirm("Pretende sair deste grupo?")) {

            return;

        }

        try {

            await leaveGroup(group._id);

            refreshGroups();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao sair do grupo."
            );

        }

    };

    const handleDelete = async () => {

        if (!window.confirm("Tem a certeza que pretende eliminar este grupo?")) {

            return;

        }

        try {

            await deleteGroup(group._id);

            refreshGroups();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao eliminar grupo."
            );

        }

    };

    return (

        <div className="card shadow-sm h-100">

            <div className="card-body d-flex flex-column">

                <h4>{group.title}</h4>

                <p className="text-muted">

                    {group.subject}

                </p>

                <p className="flex-grow-1">

                    {group.description}

                </p>

                <hr />

                <p>

                    <strong>Proprietário:</strong> {group.owner?.name}

                </p>

                <p>

                    <strong>Membros:</strong> {group.members.length}/{group.maxMembers}

                </p>

                <div className="d-grid gap-2 mt-3">

                    {isOwner ? (

                        <>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/groups/${group._id}`)}
                            >
                                Abrir Grupo
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Eliminar Grupo
                            </button>
                        </>

                    ) : isMember ? (

                        <>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/groups/${group._id}`)}
                            >
                                Abrir Grupo
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={handleLeave}
                            >
                                Sair do Grupo
                            </button>
                        </>

                    ) : (

                        <button
                            className="btn btn-success"
                            onClick={handleJoin}
                        >
                            Entrar no Grupo
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

}

export default GroupCard;