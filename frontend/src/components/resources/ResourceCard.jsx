import { deleteResource } from "../../services/resourceService";

function ResourceCard({ resource, onDelete }) {

    const handleDelete = async () => {

        if (!window.confirm("Eliminar este recurso?")) {

            return;

        }

        try {

            await deleteResource(resource._id);

            onDelete();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Erro ao eliminar recurso."
            );

        }

    };

    return (

        <div className="card shadow-sm mb-3">

            <div className="card-body d-flex justify-content-between align-items-center">

                <div>

                    <h5 className="mb-1">

                        {resource.title}

                    </h5>

                    <small className="text-muted">

                        Enviado por {resource.uploadedBy?.name}

                    </small>

                    <br />

                    <small className="text-muted">

                        {new Date(resource.createdAt).toLocaleDateString()}

                    </small>

                </div>

                <div>

                    <a
                        href={`http://localhost:5000/uploads/${resource.fileName}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success me-2"
                    >
                        Download
                    </a>

                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ResourceCard;