import { useEffect, useState } from "react";

import GroupCard from "../components/groups/GroupCard";
import CreateGroupModal from "../components/groups/CreateGroupModal";

import { getGroups } from "../services/groupService";

function Groups() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const loadGroups = async () => {

        try {

            const data = await getGroups();

            setGroups(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadGroups();

    }, []);

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold">

                        Grupos de Estudo

                    </h1>

                    <p className="text-muted">

                        Explore ou crie um novo grupo.

                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateModal(true)}
                >

                    <i className="bi bi-plus-circle me-2"></i>

                    Novo Grupo

                </button>

            </div>

            {loading ? (

                <div className="text-center">

                    <div className="spinner-border text-primary"></div>

                </div>

            ) : groups.length === 0 ? (

                <div className="alert alert-info">

                    Ainda não existem grupos.

                </div>

            ) : (

                <div className="row g-4">

                    {groups.map(group => (

                        <div
                            className="col-md-6 col-lg-4"
                            key={group._id}
                        >

                            <GroupCard
                                group={group}
                                refreshGroups={loadGroups}
                            />

                        </div>

                    ))}

                </div>

            )}

            <CreateGroupModal

                show={showCreateModal}

                onClose={() => setShowCreateModal(false)}

                refreshGroups={loadGroups}

            />

        </div>

    );

}

export default Groups;  