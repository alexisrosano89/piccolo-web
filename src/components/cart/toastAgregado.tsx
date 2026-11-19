import { Link } from "react-router-dom";
import { toast } from "react-toastify";

/** Aviso "Producto agregado al presupuesto" con un link "Ver" que lleva a /presupuesto. */
export const toastAgregado = () => {
    toast.success(({ closeToast }) => (
        <div className="toast-agregado">
            <span>Producto agregado al presupuesto</span>
            <Link to="/presupuesto" onClick={() => closeToast?.()}>Ver</Link>
        </div>
    ));
};
