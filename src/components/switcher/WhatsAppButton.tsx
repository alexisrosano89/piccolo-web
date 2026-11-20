import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "59898314477"; // WhatsApp de eventos

const WhatsAppButton = () => {
    return (
        <>
            <Link
                to={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                className="whatsapp-float-btn"
                aria-label="Chatear por WhatsApp"
            >
                <i className="fab fa-whatsapp" />
            </Link>
        </>
    );
};

export default WhatsAppButton;
