import { useState } from "react";

import { uploadResource } from "../../services/resourceService";

function UploadResourceModal({ groupId, refresh }) {

    const [title, setTitle] = useState("");

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);

        formData.append("groupId", groupId);

        formData.append("file", file);

        try {

            await uploadResource(formData);

            setTitle("");

            setFile(null);

            refresh();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Erro ao carregar recurso."

            );

        }

    };

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h4>

                    Novo Recurso

                </h4>

                <form onSubmit={handleSubmit}>

                    <input

                        className="form-control mb-3"

                        placeholder="Título"

                        value={title}

                        onChange={(e) => setTitle(e.target.value)}

                        required

                    />

                    <input

                        className="form-control mb-3"

                        type="file"

                        onChange={(e) => setFile(e.target.files[0])}

                        required

                    />

                    <button className="btn btn-primary">

                        Upload

                    </button>

                </form>

            </div>

        </div>

    );

}

export default UploadResourceModal;