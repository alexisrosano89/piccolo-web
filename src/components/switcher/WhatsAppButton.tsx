import { Link } from "react-router-dom";
import pedidosYaIcon from "/assets/img/social/pedidosya.png";

const WHATSAPP_NUMBER = "59894610637";

const WhatsAppButton = () => {
    return (
        <>
            <Link
                to="#"
                className="pedidosya-float-btn"
                aria-label="PedidosYa"
            >
                <img src={pedidosYaIcon} alt="PedidosYa" />
            </Link>
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
