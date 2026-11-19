import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
    const [quantity, setQuantity] = useState(1);

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
        toast.success("Producto agregado al presupuesto");
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
                        <div className="qty-stepper">
                            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
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