import { toastAgregado } from "../cart/toastAgregado";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import QtyStepper from "../select/QtyStepper";
import { cantidadMinima } from "../../utils/presupuesto";
import { addToCart } from "../../store/slices/cartSlice";
import { slugify } from "../../assets/jsonData/menu/slugify";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    text?: string;
    tags?: string[] | undefined;
    price?: number;
    filterClass?: string[];
    delay?: string;
}

// Offset menu item ids so they never collide with shop product ids in the shared cart.
const MENU_CART_ID_OFFSET = 9000;

const SingleIsotopeContent = ({ food }: { food: DataType }) => {
    const { id, thumb, title, text, price, delay } = food

    const dispatch = useDispatch();
    // Menús principales arrancan (y no bajan) de 15 personas; complementos, de 1.
    const minimo = cantidadMinima({ id: MENU_CART_ID_OFFSET + (id ?? 0) });
    const [quantity, setQuantity] = useState(minimo);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: MENU_CART_ID_OFFSET + id!,
                title: title!,
                price: price!,
                thumb: `menu/${thumb}`,
                quantity,
            })
        );
        toastAgregado(MENU_CART_ID_OFFSET + id!);
    };

    return (
        <>
            <div className="item" data-aos="fade-up" data-aos-delay={delay}>
                <div className="thumb">
                    <Link to={`/cotizar/${slugify(title || '')}`}>
                        <img src={`/assets/img/menu/${thumb}`} alt="Thumb" width={600} height={600} />
                    </Link>
                </div>
                <div className="info">
                    <h4><Link to={`/cotizar/${slugify(title || '')}`}>{title}</Link></h4>
                    <p>{text}</p>
                    <div className="item-price">
                        <div className="left">
                            <span>Precio p/p</span>
                            <h5>${price?.toFixed(0)}</h5>
                        </div>
                    </div>
                    <div className="quick-add-to-cart">
                        <QtyStepper value={quantity} onChange={setQuantity} min={minimo} />
                        <button type="button" className="add-to-cart-btn" onClick={handleAddToCart}>
                            <i className="fas fa-shopping-cart" />
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleIsotopeContent;