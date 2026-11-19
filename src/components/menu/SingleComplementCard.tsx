import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../store/slices/cartSlice";
import { slugify } from "../../assets/jsonData/menu/slugify";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    tags?: string[];
    price?: number;
}

const MENU_CART_ID_OFFSET = 9000;

const SingleComplementCard = ({ food }: { food: DataType }) => {
    const { id, thumb, tags, title, price } = food;

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: MENU_CART_ID_OFFSET + id!,
                title: title!,
                price: price!,
                thumb: `menu/${thumb}`,
                quantity: 1,
            })
        );
        toast.success("Producto agregado al presupuesto");
    };

    return (
        <>
            <li className="product">
                <div className="product-contents">
                    <div className="product-image">
                        <Link to={`/cotizar/${slugify(title || '')}`}>
                            <img src={`/assets/img/menu/${thumb}`} alt={title} width={450} height={450} />
                        </Link>
                        <div className="shop-action">
                            <ul>
                                <li className="cart">
                                    <Link to="#" onClick={handleAddToCart}><span>Agregar</span></Link>
                                </li>
                                <li className="quick-view">
                                    <Link to={`/cotizar/${slugify(title || '')}`}><span>Ver más</span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="product-caption">
                        <div className="product-tags">
                            {tags && tags.map((tag, index) => (
                                <Link to="#" key={index}>
                                    {tag}
                                    {index < tags.length - 1 && ','}
                                </Link>
                            ))}
                        </div>
                        <h4 className="product-title">
                            <Link to={`/cotizar/${slugify(title || '')}`}>{title}</Link>
                        </h4>
                        <div className="price">
                            <span> ${price?.toFixed(0)}</span>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default SingleComplementCard;
