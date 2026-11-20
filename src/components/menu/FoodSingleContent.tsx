import { toastAgregado } from "../cart/toastAgregado";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import QtyStepper from "../select/QtyStepper";
import { cantidadMinima } from "../../utils/presupuesto";
import { addToCart } from "../../store/slices/cartSlice";
import RelatedComplements from "./RelatedComplements";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    text?: string;
    tags?: string[];
    price?: number;
    category?: string[];
    description?: string[];
}

const MENU_CART_ID_OFFSET = 9000;

const categoryLabels: Record<string, string> = {
    pizzas: "Pizzas",
    chivitos: "Chivitos",
    asado: "Asado",
    complementos: "Complementos",
};

const FoodSingleContent = ({ food }: { food: DataType }) => {
    const { id, thumb, title, text, tags, price, category, description } = food;
    const isComplement = category?.includes("complementos");

    const dispatch = useDispatch();
    // Menús principales arrancan (y no bajan) de 15 personas; complementos, de 1.
    const minimo = cantidadMinima({ id: MENU_CART_ID_OFFSET + (id ?? 0) });
    const [quantity, setQuantity] = useState(minimo);

    // Al pasar de un menú a otro (misma página, otra URL) volvemos al mínimo del nuevo menú.
    useEffect(() => {
        setQuantity(minimo);
    }, [id, minimo]);

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
            <div className="validtheme-shop-single-area default-padding">
                <div className="container">
                    <div className="product-details">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-thumb">
                                    <div className="item-box">
                                        <div className="product-item">
                                            <img src={`/assets/img/menu/${thumb}`} alt={title} width={600} height={600} style={{ borderRadius: "50%" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="single-product-contents">
                                    <div className="summary-top-box">
                                        {/* Categoría del plato: la del menú (Asado, Pizzas, Chivitos) o, en los
                                            complementos, qué es (Bebidas, Picadas, Postres...) */}
                                        <div className="product-tags">
                                            <span className="product-tags-label">Categoría:</span>{" "}
                                            {isComplement
                                                ? <span>{tags?.join(", ")}</span>
                                                : category?.map((cat, index) => (
                                                    <Link key={cat} to={`/cotizar?categoria=${cat}`}>
                                                        {categoryLabels[cat] || cat}
                                                        {index < category.length - 1 && ','}
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                    <h2 className="product-title">{title}</h2>
                                    <div className="price">
                                        <span>${price?.toFixed(0)}</span> <small>precio por persona</small>
                                    </div>
                                    <p>{text}</p>
                                    <div className="product-purchase-list">
                                        <QtyStepper value={quantity} onChange={setQuantity} min={minimo} />
                                        <Link to="#" className="btn secondary btn-theme btn-sm animation" onClick={handleAddToCart}>
                                            <i className="fas fa-shopping-cart" />
                                            Agregar al presupuesto
                                        </Link>
                                    </div>
                                    {/* Descripción y datos clave, resumidos debajo del botón */}
                                    <div className="menu-summary">
                                        {description && description.length > 0 && (
                                            <div className="menu-summary-text">
                                                {description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RelatedComplements />
                </div>
            </div>
        </>
    );
};

export default FoodSingleContent;
