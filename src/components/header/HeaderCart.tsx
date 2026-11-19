import { toastEliminado } from "../cart/toastAgregado";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { MIN_PERSONAS_SENA, calcularTotales, estadoSena, mensajeMinimoSena } from "../../utils/presupuesto";
import { formatPesos } from "../../utils/presupuesto";
import { removeFromCart } from "../../store/slices/cartSlice";

const HeaderCart = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalAmount = calcularTotales(cartItems).total; // con descuento por cantidad
    const sena = estadoSena(cartItems);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toastEliminado(id);
    };

    return (
        <div className="attr-right">
            <div className="attr-nav attr-box">
                <ul>
                    <li className="dropdown">
                        <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="far fa-shopping-cart" />
                            {cartItems.length > 0 && <span className="badge badge-total">{formatPesos(totalAmount)}</span>}
                        </Link>

                        <ul className="dropdown-menu cart-list">
                            {cartItems.length > 0 ? (
                                <>
                                    <ul>
                                        {cartItems.map((item) => (
                                            <li key={item.id}>
                                                <div className="thumb">
                                                    <span className="photo">
                                                        <img src={`/assets/img/${item.thumb}`} alt={item.title} />
                                                    </span>
                                                    <Link to="#" className="remove-product" onClick={() => handleRemove(item.id)} >
                                                        <i className="fas fa-times" />
                                                    </Link>
                                                </div>
                                                <div className="info">
                                                    <h6>{item.title}</h6>
                                                    <p>{item.quantity}x - <span className="price">{formatPesos(item.price)}</span></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <li className="total">
                                        <span className="pull-right cart-total"><strong>Total</strong><strong>{formatPesos(totalAmount)}</strong></span>
                                        <Link to="/presupuesto" className="btn btn-default btn-cart">Ver</Link>
                                        <Link to={sena.habilitada ? "/reservar" : "/presupuesto"} className={`btn btn-default btn-cart${sena.habilitada ? "" : " btn-cart-disabled"}`} title={sena.habilitada ? undefined : mensajeMinimoSena(sena)}>Señar</Link>
                                        {!sena.habilitada && <p className="cart-sena-minimo">Mínimo {MIN_PERSONAS_SENA} personas por menú principal para señar.</p>}
                                    </li>
                                </>
                            ) : (
                                <li className="total">
                                    <p>Tu presupuesto está vacío.</p>
                                </li>
                            )}
                        </ul>
                    </li>
                    <li className="button"><Link to="/cotizar">Cotizar</Link></li>
                </ul>
            </div>
        </div>
    );
};


export default HeaderCart;