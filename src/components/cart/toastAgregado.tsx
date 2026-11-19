import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { esMenuPrincipal } from "../../utils/presupuesto";

/** "Menú" para menús principales (pizzas, chivitos, asado); "Producto" para complementos. */
export const nombreTipo = (cartId: number) => (esMenuPrincipal({ id: cartId }) ? "Menú" : "Producto");

/** Aviso "Menú/Producto agregado al presupuesto" con un link "Ver" que lleva a /presupuesto. */
export const toastAgregado = (cartId: number) => {
    toast.success(({ closeToast }) => (
        <div className="toast-agregado">
            <span>{nombreTipo(cartId)} agregado al presupuesto</span>
            <Link to="/presupuesto" onClick={() => closeToast?.()}>Ver</Link>
        </div>
    ));
};

/** Aviso "Menú/Producto eliminado del presupuesto". */
export const toastEliminado = (cartId: number) => {
    toast.error(`${nombreTipo(cartId)} eliminado del presupuesto`);
};
