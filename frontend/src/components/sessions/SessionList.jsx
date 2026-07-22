import SessionCard from "./SessionCard";

function SessionList({ sessions, onDelete, refresh }) {

    if (sessions.length === 0) {

        return (

            <div className="alert alert-info">

                Ainda não existem sessões.

            </div>

        );

    }

    return (

        <>

            {sessions.map(session => (

               <SessionCard

                    key={session._id}

                    session={session}

                    onDelete={onDelete}

                    refresh={refresh}

                />

            ))}

        </>

    );

}

export default SessionList;