import { useState } from "react";

const FooterNewsletter = () => {
    const [showModal, setShowModal] = useState(false);

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.reset();
        setShowModal(true);
    };

    return (
        <>
            <form onSubmit={handleForm}>
                <input
                    type="email"
                    placeholder="Tu Email"
                    className="form-control"
                    name="email"
                    autoComplete="off"
                    required
                />
                <button type="submit"> Suscribirse
                    <i className="fas fa-long-arrow-right" />
                </button>
            </form>

            {showModal &&
                <div className="coming-soon-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="coming-soon-modal-close" onClick={() => setShowModal(false)}>
                            <i className="fa fa-times" />
                        </button>
                        <i className="fas fa-bell coming-soon-modal-icon" />
                        <h4>Próximamente</h4>
                        <p>Estamos trabajando en esta función. ¡Muy pronto vas a poder suscribirte!</p>
                    </div>
                </div>
            }
        </>
    );
};

export default FooterNewsletter;
