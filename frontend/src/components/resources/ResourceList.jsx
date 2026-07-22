import ResourceCard from "./ResourceCard";

function ResourceList({ resources, onDelete }) {

    if (resources.length === 0) {

        return (

            <div className="alert alert-info">

                Ainda não existem recursos.

            </div>

        );

    }

    return (

        <>

            {resources.map(resource => (

                <ResourceCard

                    key={resource._id}

                    resource={resource}

                    onDelete={onDelete}

                />

            ))}

        </>

    );

}

export default ResourceList;