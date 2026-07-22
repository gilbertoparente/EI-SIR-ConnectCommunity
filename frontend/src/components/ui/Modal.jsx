function Modal({

    show,
    title,
    children,
    onClose,
    onSubmit,
    submitText = "Guardar"

}) {

    if (!show) return null;

    return (

        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1050
            }}
        >

            <div
                className="card shadow"
                style={{
                    width: "500px",
                    maxWidth: "95%"
                }}
            >

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h5 className="mb-0">

                        {title}

                    </h5>

                    <button
                        className="btn-close"
                        onClick={onClose}
                    ></button>

                </div>

                <form onSubmit={onSubmit}>

                    <div className="card-body">

                        {children}

                    </div>

                    <div className="card-footer text-end">

                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >

                            Cancelar

                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >

                            {submitText}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default Modal;