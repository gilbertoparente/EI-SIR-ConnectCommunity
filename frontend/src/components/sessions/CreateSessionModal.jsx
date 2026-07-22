import { useState } from "react";

import { createSession } from "../../services/studySessionService";

function CreateSessionModal({ groupId, refresh }) {

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        date: "",
        location: "",
        calendarLink: "",
        maxParticipants: 20

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

            await createSession({

                ...formData,
                groupId

            });

            setFormData({

                title: "",
                description: "",
                date: "",
                location: "",
                calendarLink: "",
                maxParticipants: 20

            });

            refresh();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Erro ao criar sessão."

            );

        }

    };

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h4>

                    Nova Sessão

                </h4>

                <form onSubmit={handleSubmit}>

                    <input

                        className="form-control mb-3"

                        placeholder="Título"

                        name="title"

                        value={formData.title}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        className="form-control mb-3"

                        placeholder="Descrição"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                    />

                    <input

                        type="datetime-local"

                        className="form-control mb-3"

                        name="date"

                        value={formData.date}

                        onChange={handleChange}

                        required

                    />

                    <input

                        className="form-control mb-3"

                        placeholder="Local"

                        name="location"

                        value={formData.location}

                        onChange={handleChange}

                    />

                    <input

                        className="form-control mb-3"

                        placeholder="Link Meet / Teams (opcional)"

                        name="calendarLink"

                        value={formData.calendarLink}

                        onChange={handleChange}

                    />

                    <input

                        type="number"

                        className="form-control mb-3"

                        name="maxParticipants"

                        value={formData.maxParticipants}

                        min="1"

                        onChange={handleChange}

                    />

                    <button className="btn btn-primary">

                        Criar Sessão

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateSessionModal;