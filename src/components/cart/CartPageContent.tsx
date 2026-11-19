import { toastEliminado } from "./toastAgregado";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { GROUP_DISCOUNTS, MIN_PERSONAS_SENA, calcularLinea, calcularTotales, estadoSena, mensajeMinimoSena, cantidadMinima } from "../../utils/presupuesto";
import QtyStepper from "../select/QtyStepper";

// Para el aviso, de menor a mayor: +50, +100, +150.
const ESCALONES = [...GROUP_DISCOUNTS].reverse();

const CartPageContent = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const { subtotal, descuento, total } = calcularTotales(cartItems);
    const sena = estadoSena(cartItems);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toastEliminado(id);
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    return (
        <div className="cart-page default-padding overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Info: descuentos por cantidad de invitados (se aplican solos, ver utils/presupuesto.ts) */}
                        <p className="woocommerce-info group-discounts-note">
                            Descuentos por cantidad de invitados: {ESCALONES.map(d => `+${d.personas} personas, ${d.descuento}%`).join(" · ")}. Válido para menú principal.
                        </p>

                        {/* Presupuesto vacío: en vez de la tabla vacía, un mensaje para ir a los menús */}
                        {cartItems.length === 0 && (
                            <div className="cart-empty">
                                <i className="fas fa-clipboard-list" aria-hidden="true" />
                                <h3>Tu presupuesto está vacío</h3>
                                <p>Agregá los platos que quieras desde Cotizar y acá vas a ver el costo final de tu evento.</p>
                                <Link to="/cotizar" className="btn btn-theme btn-md animation">Ver menús</Link>
                            </div>
                        )}

                        {cartItems.length > 0 && (<>
                        <div className="shop-cart-info">
                            <form className="woocommerce-cart-form">
                                <table className="shop-cart-table">
                                    <thead>
                                        <tr>
                                            <th aria-label="Quitar"></th>
                                            <th aria-label="Foto"></th>
                                            <th>Menú</th>
                                            <th>Precio p/p</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id} className="woocommerce-cart-form">
                                                <td className="product-remove">
                                                    <Link
                                                        to="#"
                                                        className="remove"
                                                        onClick={() => handleRemove(item.id)}
                                                    >
                                                        <i className="fas fa-times" />
                                                    </Link>
                                                </td>
                                                <td className="product-thumbnail">
                                                    <Link to="#" >
                                                        <img
                                                            src={`/assets/img/${item.thumb}`}
                                                            alt={item.title}
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to="#" >
                                                        {item.title}
                                                    </Link>
                                                </td>
                                                <td className="product-price">${item.price}</td>
                                                <td className="product-quantity">
                                                    <QtyStepper
                                                        value={item.quantity}
                                                        onChange={(n) => handleQuantityChange(item.id, n)}
                                                        min={cantidadMinima(item)}
                                                    />
                                                </td>
                                                <td className="product-subtotal">
                                                    {(() => {
                                                        const linea = calcularLinea(item);
                                                        if (!linea.porcentaje) return `$${linea.bruto.toFixed(0)}`;
                                                        return (
                                                            <span className="line-discount">
                                                                <del>${linea.bruto.toFixed(0)}</del>
                                                                <span>${linea.neto.toFixed(0)}</span>
                                                                <small>−{linea.porcentaje}%</small>
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                            </tr>
                                        ))}
                                        {descuento > 0 && (
                                            <>
                                                <tr className="cart-subtotal-row">
                                                    <td colSpan={5} className="text-end">Subtotal</td>
                                                    <td className="product-subtotal">${subtotal.toFixed(0)}</td>
                                                </tr>
                                                <tr className="cart-subtotal-row cart-discount-row">
                                                    <td colSpan={5} className="text-end">Descuento por cantidad</td>
                                                    <td className="product-subtotal">−${descuento.toFixed(0)}</td>
                                                </tr>
                                            </>
                                        )}
                                        <tr className="cart-total-row">
                                            <th colSpan={5} className="text-end">Total</th>
                                            <th className="product-subtotal">${total.toFixed(0)}</th>
                                        </tr>
                                        <tr>
                                            <td colSpan={6} className="actions">
                                                {sena.habilitada ? (
                                                    <Link to="/reservar">Señar fecha</Link>
                                                ) : (
                                                    <span className="sena-disabled" aria-disabled="true" title={mensajeMinimoSena(sena)}>Señar fecha</span>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>

                        {/* Banner: mínimo de personas para señar, con progreso */}
                        {!sena.habilitada && (
                            <div className="sena-banner">
                                <div className="sena-banner-icon">
                                    <i className="fas fa-users" />
                                </div>
                                <div className="sena-banner-body">
                                    {sena.sinMenuPrincipal ? (
                                        <>
                                            <h4>Agregá un menú principal para señar la fecha</h4>
                                            <p>
                                                Elegí al menos un menú de pizzas, chivitos o asado, con mínimo {MIN_PERSONAS_SENA} personas.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h4>Todavía no podés señar la fecha</h4>
                                            <p>
                                                Cada menú principal necesita mínimo {MIN_PERSONAS_SENA} personas. Los menús no se combinan.
                                            </p>
                                            {sena.pendientes.map(p => (
                                                <div className="sena-banner-menu" key={p.id}>
                                                    <div className="sena-banner-menu-head">
                                                        <strong>{p.title}</strong>
                                                        <span>
                                                            {p.quantity} de {MIN_PERSONAS_SENA} · {p.faltan === 1 ? "falta 1" : `faltan ${p.faltan}`}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="sena-banner-progress"
                                                        role="progressbar"
                                                        aria-valuemin={0}
                                                        aria-valuemax={MIN_PERSONAS_SENA}
                                                        aria-valuenow={p.quantity}
                                                        aria-label={`Personas en ${p.title}`}
                                                    >
                                                        <span style={{ width: `${Math.min(100, (p.quantity / MIN_PERSONAS_SENA) * 100)}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                {sena.sinMenuPrincipal && (
                                    <Link to="/cotizar" className="btn btn-theme btn-md animation sena-banner-btn">
                                        Ver menús
                                    </Link>
                                )}
                            </div>
                        )}
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageContent;