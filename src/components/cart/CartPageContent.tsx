import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

const CartPageContent = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toast.error("Producto quitado del presupuesto");
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    return (
        <div className="cart-page default-padding overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-cart-info">
                            <form className="woocommerce-cart-form">
                                <table className="shop-cart-table">
                                    <thead>
                                        <tr>
                                            <th>Quitar</th>
                                            <th>Foto</th>
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
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        title="Cantidad"
                                                        min={1}
                                                        step={1}
                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="product-subtotal">
                                                    ${(item.price * item.quantity).toFixed(0)}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={6} className="actions">
                                                <div className="coupon">
                                                    <input type="text" placeholder="Código de descuento" />
                                                    <button type="submit">Aplicar</button>
                                                </div>
                                                <Link to="/reservar">Señar fecha</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div className="shop-cart-totals mt-50">
                            <h2>Total del presupuesto</h2>
                            <div className="table-responsive table-bordered">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Subtotal</th>
                                            <th scope="col">${subtotal.toFixed(0)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Traslado</th>
                                            <td>
                                                <p>Sin costo dentro de Montevideo y Ciudad de la Costa.</p>
                                                <p>Para otras zonas, consultanos por WhatsApp.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Total</th>
                                            <td>${subtotal.toFixed(0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageContent;