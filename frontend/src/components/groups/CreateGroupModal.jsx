import { useState } from "react";

import Modal from "../ui/Modal";

import { createGroup } from "../../services/groupService";

function CreateGroupModal({ show, onClose, refreshGroups }) {

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        description: "",
        maxMembers: 10
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createGroup(formData);

            refreshGroups();

            setFormData({
                title: "",
                subject: "",
                description: "",
                maxMembers: 10
            });

            onClose();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao criar grupo."
            );

        }

    };

    return (

        <Modal
            show={show}
            title="Criar Grupo"
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText="Criar Grupo"
        >

            <div className="mb-3">

                <label className="form-label">

                    Título

                </label>

                <input
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Disciplina

                </label>

                <input
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Descrição

                </label>

                <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

            </div>

            <div className="mb-3">

                <label className="form-label">

                    Máximo de membros

                </label>

                <input
                    type="number"
                    className="form-control"
                    name="maxMembers"
                    value={formData.maxMembers}
                    onChange={handleChange}
                    min="2"
                />

            </div>

        </Modal>

    );

}

export default CreateGroupModal;