import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

const HeaderCart = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toast.error("Producto quitado del presupuesto");
    };

    return (
        <div className="attr-right">
            <div className="attr-nav attr-box">
                <ul>
                    <li className="dropdown">
                        <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="far fa-shopping-cart" />
                            <span className="badge">{totalItems}</span>
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
                                                    <p>{item.quantity}x - <span className="price">${item.price}</span></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <li className="total">
                                        <span className="pull-right"><strong>Total</strong>: ${totalAmount.toFixed(0)}</span>
                                        <Link to="/presupuesto" className="btn btn-default btn-cart">Ver</Link>
                                        <Link to="/reservar" className="btn btn-default btn-cart">Señar</Link>
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