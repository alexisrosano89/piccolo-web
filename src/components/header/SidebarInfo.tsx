import { toastEliminado } from "../cart/toastAgregado";
import logoLight2 from "/assets/img/logo-light-2.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SocialShareV3 from "../social/SocialShareV3";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/slices/cartSlice";
import { RootState } from "../../store/store";
import { MIN_PERSONAS_SENA, calcularTotales, estadoSena, mensajeMinimoSena } from "../../utils/presupuesto";
import { formatPesos } from "../../utils/presupuesto";

interface HeaderSearchProps {
    closeInfoBar?: () => void;
    isInfoOpen?: boolean;
    openInfoBar?: () => void;
}

interface FormEventHandler {
    // eslint-disable-next-line no-unused-vars
    (event: React.FormEvent<HTMLFormElement>): void;
}

const handleForm: FormEventHandler = (event) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement;
    form.reset()
    toast.success("¡Gracias por suscribirte!")
}

const SidebarInfo: React.FC<HeaderSearchProps> = ({ closeInfoBar, isInfoOpen }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalAmount = calcularTotales(cartItems).total; // con descuento por cantidad
    const sena = estadoSena(cartItems);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toastEliminado(id);
    };

    return (
        <>
            <div className="attr-right">
                <div className="attr-nav attr-box">
                    <ul>
                        <li className="dropdown">
                            <Link to="/presupuesto" className="dropdown-toggle" data-toggle="dropdown">
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
                    </ul>
                </div>
            </div>

            <div className={`side ${isInfoOpen ? "on" : ""}`}>
                <Link to="#" className="close-side" onClick={closeInfoBar}><i className="fa fa-times"></i></Link>
                <div className="widget">
                    <div className="logo">
                        <img src={logoLight2} alt="Logo" />
                    </div>
                    <p>
                        Cocina artesanal a la leña para tus eventos: pizzas, chivitos, asado y mucho más. También hacemos delivery de jueves a domingo.
                    </p>
                </div>
                <div className="widget address">
                    <div>
                        <ul>
                            <li>
                                <div className="content">
                                    <p>Dirección</p>
                                    <strong>Cielo Azul 5611 esq. Rambla, Shangrilá</strong>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <p>Email</p>
                                    <strong>info@piccolo.com.uy</strong>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <p>Eventos</p>
                                    <strong>098 314 477</strong>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="widget newsletter">
                    <h4 className="title">Suscribite</h4>
                    <form onSubmit={handleForm}>
                        <div className="input-group stylish-input-group">
                            <input type="email" placeholder="Tu email" className="form-control" name="email" autoComplete="off" required />
                            <span className="input-group-addon">
                                <button type="submit">
                                    <i className="fas fa-arrow-right" />
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
                <div className="widget social">
                    <ul className="link">
                        <SocialShareV3 />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SidebarInfo;